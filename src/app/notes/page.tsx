"use client"

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './notes.css';
import { format } from 'date-fns';
import { useNotebooks } from '@/lib/notebookContext'

export default function Notes() {
  const { notebooks, fetchNotebooks, addNote, handleDeleteNote } = useNotebooks();

  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotebooks();
  }, [fetchNotebooks]);

  function handleAddNotebook(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Adding notebook');
    addNote(title);
    setTitle('');
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-100 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
  <div className="py-4">
    <h1 className="text-xl font-semibold">Your Notebooks</h1>
  </div>

  <div className="grid grid-cols-3 gap-4 mb-4">
    <form onSubmit={handleAddNotebook} className="col-span-3 flex bg-white shadow-sm rounded-md overflow-hidden">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Notebook Title"
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md"
      >
        Add Notebook
      </button>
    </form>
  </div>

  <div className="grid grid-cols-4 gap-4">
    {notebooks.map((notebook) => (
      <div
        key={notebook.id}
        style={{ backgroundColor: notebook.color }}
        className="p-4 rounded-md text-left cursor-pointer transition hover:shadow-md"
        onClick={() => navigate(`/notebook/${notebook.id}`)}
      >
        <h2 style={{ color: notebook.tintColor }} className="font-semibold">{notebook.title}</h2>
        
        <div className="flex items-center justify-between mt-2">
          <p className="opacity-50 text-xs">
            {format(notebook.createdAt.toDate(), 'MMMM dd, yyyy')}
          </p>
          <button
            className="font-bold text-xl text-red-600 opacity-60 hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNote(notebook.id);
            }}
          >
            x
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

