import { useState } from "react";

export const useGetInputValuen = (initialState) => {
    const [formData ,setFormData] = useState(initialState)

    const handlechange =  e =>{
        const {name , value} = e.target
        setFormData(prev=> ({...prev , [name]: value}) )
    }
    return {formData , handlechange , setFormData}
}