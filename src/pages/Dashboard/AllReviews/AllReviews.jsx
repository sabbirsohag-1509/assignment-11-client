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
            <title> 
                Dashboard - All Reviews
            </title>
            <h2 className="text-2xl font-semibold mb-4">All Reviews ({reviews.length})</h2>

          <div className="overflow-x-auto">
    <table className="table table-zebra w-full">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Scholarship Name</th>
                <th>University Name</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            {reviews.map((review, index) => (
                <tr key={review._id}>
                    <th>{index + 1}</th>

                    <td>{review.userName}</td>
                    <td>{review.scholarshipName}</td>
                    <td>{review.universityName}</td>
                    <td>{"⭐".repeat(review.ratingPoint)}</td>

                    <td className="min-w-[280px]">
                        <div className="max-h-20 overflow-y-auto break-words p-1">
                            {review.reviewComment}
                        </div>
                    </td>

                    <td>
                        {new Date(review.reviewDate).toLocaleDateString()}
                    </td>

                    <td className="flex gap-2 flex-wrap py-4">
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
