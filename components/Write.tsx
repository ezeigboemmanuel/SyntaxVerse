"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import { BlockNoteView, Theme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MultiSelect } from "./ui/multi-select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Separator } from "./ui/separator";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Id } from "@/convex/_generated/dataModel";

const categoriesList = [
  {
    value: "Web Development",
    label: "Web Development",
  },
  {
    value: "UI/UX",
    label: "UI/UX",
  },
  {
    value: "Backend Development",
    label: "Backend Development",
  },
  {
    value: "APIs",
    label: "APIs",
  },
  {
    value: "Frontend Development",
    label: "Frontend Development",
  },
];

const FormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  categories: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one category."),
});

interface WriteProps {
  fmrImageUrl?: string;
  categories?: string[];
  title?: string;
  article?: string;
  blogId?: Id<"blogs">;
  fmrStorageId?: Id<"_storage">;
}

const Write = ({
  fmrImageUrl,
  categories,
  title,
  article,
  blogId,
  fmrStorageId,
}: WriteProps) => {
  const storeBlog = useMutation(api.blogs.storeBlog);
  const updateBlog = useMutation(api.blogs.updateBlog);
  const currentUser = useQuery(api.users.getCurrentUser);
  const generateUploadUrl = useMutation(api.blogs.generateUploadUrl);
  const [selectedImage, setSelectedImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string | null>(fmrImageUrl || null);
  const [content, setContent] = useState<string>(article || "");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  // For initialization; on mount, convert the initial Markdown to blocks and replace the default editor's content
  useEffect(() => {
    async function loadInitialHTML() {
      const blocks = await editor.tryParseMarkdownToBlocks(content);
      editor.replaceBlocks(editor.document, blocks);
    }
    loadInitialHTML();
  }, [editor]);

  // Base theme
  const myCustomTheme = {
    colors: {
      editor: {
        text: "black",
        background: "#FCFCFE",
      },
    },
  } satisfies Theme;

  const onContentChange = async () => {
    // Converts the editor's contents from Block objects to Markdown and store to state.
    const newContent = await editor.blocksToMarkdownLossy(editor.document);
    setContent(newContent);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e.target.files?.[0]);
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: `${pathname == `/blog/${blogId}/edit` ? title : ""}`,
      categories: pathname == `/blog/${blogId}/edit` ? categories : [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    if (pathname == `/blog/${blogId}/edit` && !selectedImage) {
      await updateBlog({
        id: blogId as Id<"blogs">,
        title: data.title,
        article: content,
        categories: data.categories,
        format: "image",
        imageUrl: imageUrl as string,
        storageId: fmrStorageId as Id<"_storage">,
        views: 1,
      })
        .then(() => {
          toast.success("Article updated successfully!");
          router.push(`/blog/${blogId}`);
          router.refresh()
        })
        .catch((error) => {
          console.log(error);
          toast.success("Update article error");
        });
    }

    const postUrl = await generateUploadUrl();
    
    if (!imageUrl || !selectedImage) {
      {pathname !== `/blog/${blogId}/edit` ? toast.error("Please input an Image") : ""};
      return;
    }

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage.type },
      body: selectedImage,
    });

    const json = await result.json();

    if (!result.ok) {
      toast.error("Upload failed! Please try again.");
      throw new Error(`Upload failed: ${JSON.stringify(json)}`);
    }
    const { storageId } = json;
    if (pathname == "/write") {
      await storeBlog({
        title: data.title,
        article: content,
        categories: data.categories,
        format: "image",
        imageUrl: imageUrl,
        storageId: storageId,
        views: 1,
      })
        .then(() => {
          setLoading(false);
          toast.success(`Article published successfully`);
          router.push(`/blog/${blogId}`);
          router.refresh()
        })
        .catch((error) => {
          console.log(error);
          toast.success("Article submission error.");
        });
    }

    if (pathname == `/blog/${blogId}/edit` && selectedImage) {
      await updateBlog({
        id: blogId as Id<"blogs">,
        title: data.title,
        article: content,
        categories: data.categories,
        format: "image",
        imageUrl: imageUrl,
        storageId: storageId,
        views: 1,
      })
        .then(() => {
          toast.success("Article updated successfully!");
          router.push(`/blog/${blogId}`);
          router.refresh()
        })
        .catch((error) => {
          console.log(error);
          toast.success("Update article error");
        });
    }
  }
  return (
    <div className="bg-[#FCFCFE] p-5 md:px-10 md:py-7 lg:px-16 pt-8 md:-mx-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <div className="mb-4">
              <h2 className="text-gray-800 text-sm md:text-base font-semibold mb-3">
                Add your cover image
              </h2>
              {imageUrl && (
                <AspectRatio ratio={16 / 7.5}>
                  <Image
                    src={imageUrl}
                    alt="img"
                    fill
                    className="object-cover h-full w-full max-w-5xl mx-auto"
                  />
                </AspectRatio>
              )}

              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <label
                htmlFor="fileInput"
                className="cursor-pointer rounded-md md:text-base py-2 px-5 mt-4 bg-[#6C40FE] hover:bg-[#6134f3] text-sm text-white"
              >
                {pathname !== `/blog/${blogId}/edit` ? "Update" : "Upload"} Image
              </label>
            </div>

            <div className="mb-8 max-w-3xl">
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800 font-semibold text-sm md:text-base">
                      Choose categories
                    </FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={categoriesList}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select categories"
                        variant="inverted"
                        animation={0}
                        maxCount={10}
                      />
                    </FormControl>
                    <FormDescription>
                      Choose the categories related to your article.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 font-semibold text-sm md:text-base">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your title"
                      className="bg-transparent text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mb-6 mt-5">
              <h2 className="text-gray-800 text-sm md:text-base font-semibold">
                Write your article
              </h2>
              <BlockNoteView
                editor={editor}
                onChange={onContentChange}
                theme={myCustomTheme}
                className="py-4 min-h-40"
                data-changing
              />
            </div>

            <div className="flex w-full mt-8">
              <Button
                type="submit"
                disabled={loading}
                className="rounded-full md:text-base py-1.5 px-5 bg-[#6C40FE] hover:bg-[#6134f3]"
              >
                {pathname == `/blog/${blogId}/edit` ? "Update" : "Post"} article
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Write;
