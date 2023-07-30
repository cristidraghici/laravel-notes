import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";

dayjs.extend(relativeTime);

export default function Note({ note, className }) {
    const { auth } = usePage().props;

    const [editing, setEditing] = useState(false);

    const { data, setData, patch, clearErrors, reset, errors } = useForm({
        message: note.message,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("notes.update", note.id), {
            onSuccess: () => setEditing(false),
        });
    };

    const cancel = (e) => {
        e.preventDefault();
        setEditing(false);
        reset();
        clearErrors();
    };

    return (
        <div
            className={`${className} p-6 flex space-x-2 bg-white shadow-sm rounded-lg relative`}
        >
            <div className="flex-1">
                <div className="flex justify-between items-center absolute top-2 right-2">
                    {note.user.id === auth.user.id && (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <button
                                    className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit
                                </button>
                                <Dropdown.Link
                                    as="button"
                                    href={route("notes.destroy", note.id)}
                                    method="delete"
                                >
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    )}
                </div>
                {editing ? (
                    <form onSubmit={submit} className="pt-2">
                        <textarea
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            className="mb-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        ></textarea>
                        <InputError message={errors.message} className="mt-2" />
                        <div className="space-x-2">
                            <PrimaryButton className="mt-4">Save</PrimaryButton>
                            <button className="mt-4" onClick={cancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <p className="mb-4 pt-2 text-lg text-gray-900">
                        {note.message}
                    </p>
                )}
                <div className="text-right absolute bottom-1 right-2">
                    <small className="ml-2 text-sm text-gray-600">
                        {dayjs(note.created_at).fromNow()}
                    </small>
                    {note.created_at !== note.updated_at && (
                        <>
                            <span className="pr-1 pl-1">&middot;</span>
                            <small className="text-sm text-gray-600">
                                edited {dayjs(note.updated_at).fromNow()}
                            </small>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
