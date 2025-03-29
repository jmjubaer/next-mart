"use server";

import { cookies } from "next/headers";

export const createBrand = async (data: FormData) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/brand`,
            {
                method: "POST",
                headers: {
                    Authorization: (await cookies()).get("accessToken")!.value,
                },
                body: data,
            }
        );

        return res.json();
    } catch (error) {
        console.log(error);
    }
};
