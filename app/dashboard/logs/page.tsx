// export default function page() {
//     return (
//         <div>
//             <p>Logs Page</p>
//         </div>
//     )
// }

'use client';

import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface KnowledgeProps {
    id: number;
    name: string;
}

const App: React.FC = () => {
    const knowledges: KnowledgeProps[] = [
        { id: 1, name: 'Darwin' },
        { id: 2, name: 'Rohi' },
        { id: 3, name: 'Dharyelin' },
        { id: 4, name: 'Delcy' },
        { id: 5, name: 'Marla' },
        { id: 6, name: 'Oscar' },
        { id: 7, name: 'Nairobys' },
        { id: 8, name: 'Cleider' },
    ];

    const [lists, setLists] = useState<{ lista1: KnowledgeProps[]; lista2: KnowledgeProps[] }>({
        lista1: knowledges,
        lista2: [],
    });

    const moveName = (id: number, fromList: KnowledgeProps[], toList: KnowledgeProps[]) => {
        setLists(prevLists => ({
            ...prevLists,
            [fromList === lists.lista1 ? 'lista1' : 'lista2']: prevLists[fromList === lists.lista1 ? 'lista1' : 'lista2'].filter(item => item.id !== id),
            [toList === lists.lista1 ? 'lista1' : 'lista2']: [...prevLists[toList === lists.lista1 ? 'lista1' : 'lista2'], fromList.find(item => item.id === id)!],
        }));
    };

    const moveAllNames = (fromList: KnowledgeProps[], toList: KnowledgeProps[]) => {
        setLists(prevLists => ({
            ...prevLists,
            [fromList === lists.lista1 ? 'lista1' : 'lista2']: [],
            [toList === lists.lista1 ? 'lista1' : 'lista2']: [...prevLists[toList === lists.lista1 ? 'lista1' : 'lista2'], ...fromList],
        }));
    };

    const listVariants = {
        hidden: {
            opacity: 0,
            x: -20,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <div className="flex justify-center">
            <div className="w-1/3">
                <h1 className="text-lg font-bold text-center mb-4">Lista 1</h1>
                <motion.div variants={listVariants} initial="hidden" animate="visible">
                    <ul className="border p-4 h-48 overflow-y-auto">
                        {lists.lista1.map(({ id, name }) => (
                            <motion.li key={id} variants={itemVariants} className="flex justify-between items-center mb-2 bg-white rounded-md shadow-sm hover:shadow-lg">
                                <span>{name}</span>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => moveName(id, lists.lista1, lists.lista2)}
                                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                                >
                                    <ChevronRightIcon className="h-5 w-5" />
                                </motion.button>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
            <div className="w-20 flex flex-col justify-center items-center gap-2">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => moveAllNames(lists.lista1, lists.lista2)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                >
                    <ChevronDoubleRightIcon className="h-5 w-5" />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => moveAllNames(lists.lista2, lists.lista1)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                    <ChevronDoubleLeftIcon className="h-5 w-5" />
                </motion.button>
            </div>
            <div className="w-1/3">
                <h1 className="text-lg font-bold text-center mb-4">Lista 2</h1>
                <motion.div variants={listVariants} initial="hidden" animate="visible">
                    <ul className="border p-4 h-48 overflow-y-auto">
                        {lists.lista2.map(({ id, name }) => (
                            <motion.li key={id} variants={itemVariants} className="flex justify-between items-center mb-2 bg-white rounded-md shadow-sm hover:shadow-lg">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={() => moveName(id, lists.lista2, lists.lista1)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                                >
                                    <ChevronLeftIcon className="h-5 w-5" />
                                </motion.button>
                                <span>{name}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default App;