"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
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

const categoriesList = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const FormSchema = z.object({
  categories: z
    .array(z.string().min(1))
    .min(1)
    .nonempty("Please select at least one category."),
});

const Write = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  // Creates a new editor instance.
  const editor = useCreateBlockNote();

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
    const file = e.target.files?.[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      categories: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success(
      `You have selected following frameworks: ${data.categories.join(", ")}.`
    );
  }
  return (
    <div className="bg-[#FCFCFE] p-5 md:px-10 md:py-7 lg:px-16 pt-8 -mx-3 md:-mx-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <div className="mb-4">
              <h2 className="text-lg md:text-xl font-bold mb-3">
                Add your cover image
              </h2>
              {imageUrl && (
                <AspectRatio ratio={16 / 7.5}>
                  <Image
                    src={imageUrl}
                    alt="img"
                    width={100}
                    height={100}
                    className="object-cover h-full w-full max-w-5xl mx-auto"
                  />
                </AspectRatio>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-4"
              />
            </div>

            <div className="mb-8 max-w-3xl">
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose categories</FormLabel>
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

            <input
              className="bg-transparent mb-8 border-none text-2xl md:text-4xl font-bold outline-none active:outline-none"
              placeholder="Enter your title"
            />
            <Separator />
            <div className="mb-6 mt-2">
              <label className="block text-gray-800 font-semibold text-base md:text-xl mt-4">
                Write your article
              </label>
              <BlockNoteView
                editor={editor}
                onChange={onContentChange}
                theme={myCustomTheme}
                className="py-4 min-h-40"
                data-changing
              />
            </div>

            <div className="flex w-full mt-8">
              <Button className="rounded-full md:text-base py-1.5 px-5 bg-[#6C40FE] hover:bg-[#6134f3]">
                Post article
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Write;
