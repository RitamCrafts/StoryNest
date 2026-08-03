import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

export default function RTE({
    name = "content",
    control,
    label,
    defaultValue = "",
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="mb-2 block text-sm font-semibold text-gray-800">
                    {label}
                </label>
            )}

            <div className="overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm">
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field: { value, onChange } }) => (
                        <Editor
                            tinymceScriptSrc="/tinymce/tinymce.min.js"
                            licenseKey="gpl"
                            value={value}
                            onEditorChange={onChange}
                            init={{
                                height: 400,
                                menubar: true,
                                branding: false,
                                promotion: false,
                                resize: false,

                                toolbar_mode: "scrolling",

                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "help",
                                    "wordcount",
                                ],

                                block_formats:
                                    "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3",

                                toolbar:
                                    "undo redo bold italic underline forecolor blocks | image | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",

                                content_style: `
                                    body{
                                        font-family:Inter,sans-serif;
                                        font-size:16px;
                                        line-height:1.8;
                                        padding:18px;
                                    }

                                    h1{
                                        font-size:2rem;
                                        font-weight:700;
                                        margin:1.2rem 0 .7rem;
                                    }

                                    h2{
                                        font-size:1.75rem;
                                        font-weight:700;
                                        margin:1.2rem 0 .7rem;
                                    }

                                    h3{
                                        font-size:1.5rem;
                                        font-weight:700;
                                        margin:1.2rem 0 .7rem;
                                    }

                                    img{
                                        max-width:100%;
                                        height:auto;
                                    }

                                    blockquote{
                                        border-left:4px solid #16a34a;
                                        padding-left:16px;
                                        color:#555;
                                        margin:1rem 0;
                                    }
                                `,
                            }}
                        />
                    )}
                />
            </div>
        </div>
    );
}