import React from 'react'
import TODO from "/images/TODO.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css';


//to get from local storage

const getLocalItems = () => {
    let list = localStorage.getItem("list");
    console.log(list);
    //FROM LOCAL STORAGE WE ARE GETTING STRING BUT WE NEED AN ARRAY
    if (list) {
        return JSON.parse(localStorage.getItem("list"));
    } else {
        return [];
    }

}

const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [text, setText] = useState("CHECK-LIST");
    //WE ARE PASSING AN ARRAY HERE 
    const [items, setItems] = useState(getLocalItems());
    const [toggleButton, setToggleButton] = useState(true);

    //when the item to be edited is in the input field we need its id for editing and adding it back
    const [isEditItem, setIsEditItem] = useState(null);
    const textchange = () => {
        setText("DELETE-ALL")
    }
    const textchangeagain = () => {
        setText("CHECK-LIST")
    }
    
    const addItem = () => {
        //if you do this setItems(inputData) then only 1 item which is the most recent one will be added in the array
        //if you add new item it will replace the previous one and there will only be one item left
        //use spread operator
        if (!inputData) {
            alert("no input")
            
        } else if (inputData && !toggleButton) {
            setItems(
                items.map((currentelement) => {
                    if (currentelement.id === isEditItem) {
                        return { ...currentelement, name: inputData }
                    }
                    return currentelement;
                })
            )
            setToggleButton(true);
            setInputData("")
            setIsEditItem(null);
        }

        else {
            //with this method we get a unique ID for the edit functionallity we need unique ID
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            //now every data has a unique ID
            setItems([...items, allInputData])
            setInputData("");
        }

    }
    //Edit the Item
    //When user clicks on the edit button

    //1.Get the id and name of the data which user clicked to edit
    //2.Set the toggle mode to change the Submit button into Edit button
    //3.Now update the value of the SetInput with the new updated value to edit
    //4.To pass the current element Id to new state var for ref setIsEditItem(id);

    const EditItem = (id) => {

        let newEditItem = items.find((currentdata) => {
            return currentdata.id === id
        })
        console.log(newEditItem);
        setToggleButton(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);


    }




    //add to local storage
    //add to local storage when items values changes

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(items));
    }, [items]);

    //even after clicking the plus without any input inside it empty array are being added
    //for tht use if else loop ig?
    const deleteItem = (id) => {
        console.log(id);
        const updatedItemes = items.filter((item) => {
            return item.id !== id;
        });
        setItems(updatedItemes)
    }
    const removeallItems = () => {
        setItems([])
    }
    const handlekeychange = (e) => {
        if (e.key === "Enter") {
            addItem();
        }
    }
    return (
        <>
            <div className='w-full h-[100vh] overflow-y-auto custom-radial flex flex-col justify-start items-center text-white'>
                <div className='pb-4 w-[30%] flex flex-col justify-center items-center mt-28 bg-content'>
                    <div className="flex flex-col justify-center items-center">
                        <img className="w-[150px] h-[150px]" src={TODO} alt="" />
                        <p className="text-xl text-center">Add your List Here ✌️</p>
                    </div>
                    <div className="mt-4 ">
                        <input type="text" name="" id=""
                            className="sm:w-36 md:w-48 lg:w-72 xl:w-96 h-10 outline-none bg-transparent text-white text-xl "
                            placeholder="✍️ Add Items..."
                            value={inputData} onChange={(e) => {
                                setInputData(e.target.value);

                            }}
                            onKeyDown={handlekeychange}

                        />
                       

                        {
                            toggleButton ? <FontAwesomeIcon icon={faPlus} title='Add Items' onClick={addItem}
                                className="font-bold text-xl hover:text-[#E4003A]" /> : <FontAwesomeIcon className="font-bold text-xl hover:text-green-600"
                                    onClick={addItem}
                                    icon={faPenToSquare} title='Edit item' />
                        }
                    </div>
                    <div className="flex flex-col items-center justify-center  mt-4 mb-4 ">
                        {
                            items.map((currentdata) => {
                                return (
                                    <div className="flex sm:w-36 md:w-48 lg:w-72 xl:w-80 text-xl font-md rounded-lg flex-wrap text-wrap flex-row text-white border items-center justify-between px-4 py-2 m-4 hover:bg-white hover:text-blue-500" key={currentdata.id}>
                                        <p className=" text-ellipsis">{currentdata.name}</p>
                                        <div className="flex gap-2">
                                            <FontAwesomeIcon className="hover:text-green-600"
                                                onClick={() => EditItem(currentdata.id)}
                                                icon={faPenToSquare} title='Edit item' />

                                            <FontAwesomeIcon icon={faTrash} onClick={() => deleteItem(currentdata.id)} title='Delete Items'
                                                className="hover:text-[#E4003A] "
                                            />

                                        </div>

                                    </div>
                                )
                            })
                        }

                    </div>
                    <div onMouseOver={textchange} onMouseOut={textchangeagain}>
                        <button className=" border px-3 py-2  hover:bg-[#E4003A]">
                            <span
                                className="btn-text "
                                onClick={removeallItems}>{text}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo