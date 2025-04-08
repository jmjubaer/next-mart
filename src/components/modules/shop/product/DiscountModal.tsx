"use client";
import { Button } from "@/components/ui/button";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/NMImagePreview";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createBrand } from "@/services/brand";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const DiscountModal = () => {
    const [imageFiles, setImageFiles] = useState<File[] | []>([]);
    const [imagePreview, setImagePreview] = useState<string[] | []>([]);
    const form = useForm();
    const {
        formState: { isSubmitting },
    } = form;
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const fromData = new FormData();
            fromData.append("data", JSON.stringify(data));
            fromData.append("logo", imageFiles[0]);
            const res = await createBrand(fromData);
            console.log(res);
            if (res?.success) {
                toast.success(res?.message);
                form.reset();
                setImageFiles([]);
            } else {
                toast.error(res?.message);
            }
        } catch (err: any) {
            console.error(err);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Brand</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Brand Form</DialogTitle>
                    <div className=''>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className='flex justify-between gap-2 mt-4 items-center'>
                                    {imagePreview.length > 0 ? (
                                        <ImagePreviewer
                                            setImageFiles={setImageFiles}
                                            imagePreview={imagePreview}
                                            setImagePreview={setImagePreview}
                                            className='mt-8'
                                        />
                                    ) : (
                                        <div className='mt-8'>
                                            <NMImageUploader
                                                setImageFiles={setImageFiles}
                                                setImagePreview={
                                                    setImagePreview
                                                }
                                                label='Upload logo'
                                            />
                                        </div>
                                    )}
                                </div>
                                <Button
                                    // disabled={isSubmitting ? false : true}
                                    type='submit'
                                    className='mt-5 w-full'>
                                    {isSubmitting ? "Creating...." : "Create"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default DiscountModal;
