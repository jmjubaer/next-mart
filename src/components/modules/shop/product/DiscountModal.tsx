"use client";
import { Button } from "@/components/ui/button";
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
import { addFlashSale } from "@/services/FlashSale";
import { Dispatch, SetStateAction } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const DiscountModal = ({
    selectedId,
    setSelectedId,
}: {
    selectedId: string[];
    setSelectedId: Dispatch<SetStateAction<string[] | []>>;
}) => {
    const form = useForm();
    const {
        formState: { isSubmitting },
    } = form;
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const modifiedData = {
                products: [...selectedId],
                discountPercentage: parseFloat(data?.discountPercentage),
            };
            const res = await addFlashSale(modifiedData);
            if (res.success) {
                toast.success(res.message);
                setSelectedId([]);
                form.reset();
            } else {
                toast.error(res.message);
            }
        } catch (err: any) {
            console.error(err);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={!selectedId?.length}>Add Flash Sale</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Flash Sale</DialogTitle>
                    <div className=''>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name='discountPercentage'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Discount Percentage
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type='number'
                                                    min={0}
                                                    max={100}
                                                    {...field}
                                                    value={field.value || ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
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
