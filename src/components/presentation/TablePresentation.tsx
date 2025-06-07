'use client';
import { zodPresentation } from '../../../lib/zod/zodPresentation';
import { useAppDispatch, useAppSelector } from '../../../lib/store/hooks';
import { useEffect } from 'react';
import {
  fetchPresentation,
  selectPresentations,
} from '../../../lib/store/presentationSlice';
import Link from 'next/link';

const TITLE: Title = [
  'id',
  'title',
  'creator_nickname',
  'created_at',
  'updated_at',
];

export default function TablePresentation() {
  const dispatch = useAppDispatch();
  const presentations = useAppSelector(selectPresentations);

  useEffect(() => {
    dispatch(fetchPresentation());
  }, [dispatch]);

  return (
    <>
      <div className="container mx-auto p-4 dark:text-gray-100">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          Presentations
        </h2>

        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                {TITLE.map((el, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 font-semibold tracking-wide"
                  >
                    {el}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              {presentations.map((el, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-4 py-3">{el.id}</td>
                  <td className="px-4 py-3">
                    <Link href={`/presentation/${el.id}`}>{el.title}</Link>
                  </td>
                  <td className="px-4 py-3">{el.creator_nickname}</td>
                  <td className="px-4 py-3">
                    {new Date(el.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(el.updated_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-red-600 hover:text-red-800 font-medium transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

//types
type Title = (keyof zodPresentation)[];
