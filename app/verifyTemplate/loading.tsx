"use client";

import Box from "@/components/Box";
import { BeatLoader } from "react-spinners"

const Loading = () => {
    return (
        <Box className="h-screen flex flex-col items-center justify-center bg-neutral-100">
            <BeatLoader color="#84e3e1" size={10}/>
        </Box>
    )
}

export default Loading;