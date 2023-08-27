"use client"

import React from 'react'
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Plus} from 'lucide-react'

import * as z from 'zod';
import {useForm} from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod";

const formSchema = z.object({
    toolLink: z.string().url(
        'Please enter a valid URL'
    ),
})

type Props = {}


const SubmitATool = (props: Props) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema as any),
        defaultValues: {
            toolLink: "",
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        alert('This feature is coming soon! Hang tight!')
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="bg-stone-800 hover:bg-stone-900 rounded-full">
                    <div className="flex gap-2 items-center">
                        <Plus className="h-4 w-4" />
                        <span className="text-stone-500">Submit a tool</span>
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-white">Submit a Tool</DialogTitle>
                    <DialogDescription className="text-stone-500">
                        Know something that should be on this list? Suggest a tool and we&apos;ll review it.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="toolLink"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className="text-white">URL to Tool</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.com/" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Provide the url to your app/tool.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="bg-emerald-700 hover:bg-emerald-900">Submit</Button>
                        </form>
                    </Form>
                </div>
                {/* <DialogFooter>
                    <Button type="submit" className="bg-emerald-700 hover:bg-emerald-900">Submit</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}

export default SubmitATool
