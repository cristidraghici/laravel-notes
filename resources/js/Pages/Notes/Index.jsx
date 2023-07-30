import React, { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import Note from "@/Components/Note";

export default function Index({ auth, notes }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: "",
    });

    const [searchString, setSearchString] = useState("");

    const submit = (e) => {
        e.preventDefault();
        post(route("notes.store"), {
            onSuccess: () => {
                reset();
                setSearchString("");
            },
        });
    };

    const filteredNotes = notes.filter((note) =>
        note.message.toLowerCase().includes(searchString.toLowerCase())
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Notes" />

            <div className="md:grid md:grid-cols-4 mx-auto p-4 sm:p-6 lg:p-8">
                <div className="sm:mr-2">
                    <form onSubmit={submit}>
                        <textarea
                            value={data.message}
                            placeholder="What do you want to write down?"
                            className="block w-full md:h-40 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                            onChange={(e) => setData("message", e.target.value)}
                        ></textarea>
                        <InputError message={errors.message} className="mt-2" />
                        <PrimaryButton className="mt-4" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </form>
                </div>

                <div className="md:col-span-3 max-md:mt-6">
                    <div className="relative mb-2 mr-2">
                        <TextInput
                            id="search"
                            placeholder="What do you want to find?"
                            type="text"
                            className="w-full pr-12"
                            onChange={(e) => {
                                e.preventDefault();
                                setSearchString(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.keyCode === 27) {
                                    e.preventDefault();
                                    setSearchString("");
                                }
                            }}
                            value={searchString}
                        />
                        {!!searchString && (
                            <button
                                className="absolute top-2 right-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSearchString("");
                                }}
                            >
                                clear
                            </button>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3">
                        {filteredNotes.length === 0 && (
                            <div className="md:col-span-2 lg:col-span-3 bg-white shadow-sm rounded-lg p-6 mb-2 mr-2 text-lg text-gray-900">
                                Nothing to show.
                            </div>
                        )}
                        {filteredNotes.map((note) => (
                            <Note
                                key={note.id}
                                note={note}
                                className="mb-2 mr-2"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
