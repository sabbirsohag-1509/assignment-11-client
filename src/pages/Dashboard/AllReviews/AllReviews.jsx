import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import Swal from 'sweetalert2';

const AllReviews = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all reviews
    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['all-reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-reviews');
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    // Delete review
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This review will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if(result.isConfirmed){
                const res = await axiosSecure.delete(`/reviews/${id}`);
                if(res.data.deletedCount > 0){
                    Swal.fire("Deleted!", "Review has been removed.", "success");
                    refetch();
                }
            }
        });
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">All Reviews ({reviews.length})</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-300 rounded-lg text-sm md:text-base">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                            <th className="border px-3 py-2">User</th>
                            <th className="border px-3 py-2">Scholarship Name</th>
                            <th className="border px-3 py-2">University Name</th>
                            <th className="border px-3 py-2">Rating</th>
                            <th className="border px-3 py-2">Review</th>
                            <th className="border px-3 py-2">Date</th>
                            <th className="border px-3 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map((review) => (
                            <tr key={review._id} className="hover:bg-gray-50 border">
                                <td className="border px-3 py-2">{review.userName}</td>
                                <td className="border px-3 py-2">{review.scholarshipName}</td>
                                <td className="border px-3 py-2">{review.universityName}</td>
                                <td className="border px-3 py-2">
                                    {"⭐".repeat(review.ratingPoint)}
                                </td>
                                <td className="border px-3 py-2 max-w-xs">
                                    <div className="max-h-20 overflow-y-auto break-words p-1">
                                        {review.reviewComment}
                                    </div>
                                </td>
                                <td className="border px-3 py-2">
                                    {new Date(review.reviewDate).toLocaleDateString()}
                                </td>
                                <td className="flex gap-2 border px-3 py-2 flex-wrap">
                                    <button 
                                        className="btn btn-xs btn-error"
                                        onClick={() => handleDelete(review._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;
