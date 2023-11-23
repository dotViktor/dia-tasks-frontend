import React from "react";
import Navbar from "../componentsForAll/Navbar";

export default function TaskManager(){
    return(
        <>
            <Navbar path="/navManager" element={<Navbar/>}/>

            <div>
                <ul>
                    <li>Task 1</li>
                    <li>Task 2</li>
                    <li>Task 3</li>
                    <li>Task 4</li>
                    <li>Task 5</li>
                </ul>
            </div>
        </>
    )
}