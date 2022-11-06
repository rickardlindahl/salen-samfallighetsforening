"use client";

import { useRouter } from "next/navigation";
import { createRef } from "react";
import { useForm } from "react-hook-form";

interface CreatePostFormValues {
  title: string;
  body: string;
}

export default function CreatePostForm() {
  const { register, handleSubmit } = useForm<CreatePostFormValues>();
  const { refresh } = useRouter();

  const modalRef = createRef<HTMLLabelElement>();

  const onSubmit = async (data: CreatePostFormValues) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // handle error
    }

    modalRef.current?.click();
    refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <!-- The button to open modal --> */}
      <label htmlFor="create-post-modal" className="modal-button btn" ref={modalRef}>
        Skapa inlägg
      </label>

      <input type="checkbox" id="create-post-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="create-post-modal" className="btn-sm btn-circle btn absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Skapa inlägg</h3>
          <div className="p-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rubrik</span>
              </label>
              <input
                required
                type="title"
                placeholder="Ange en rubrik"
                className="input-bordered input"
                {...register("title")}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Text</span>
              </label>
              <input
                type="text"
                placeholder="Skriv din text här..."
                className="input-bordered input"
                required
                {...register("body")}
              />
            </div>
            <button className="btn-primay btn">Skapa inlägg</button>
          </div>
        </div>
      </div>
    </form>
  );
}
