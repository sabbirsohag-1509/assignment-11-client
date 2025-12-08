import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useState } from 'react';

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [editReview, setEditReview] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);

    const { data: reviews = [], isLoading, refetch } = useQuery({
        queryKey: ['my-reviews', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-reviews?email=${user.email}`);
            return res.data;    
        }
    });

    if (isLoading) return <LoadingSpinner />;

    //handle delete review btn
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This review will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if(result.isConfirmed) {
                const res = await axiosSecure.delete(`/reviews/${id}`);
                if(res.data.deletedCount > 0){
                    Swal.fire("Deleted!", "Review has been removed.", "success");
                    refetch();
                }
            }
        });
    };
    //handle update review btn
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updateReview = {
            reviewComment: newComment,
            ratingPoint: newRating
        };
        try {
            const res = await axiosSecure.patch(`/reviews/${editReview._id}`, updateReview);
            if(res.data.modifiedCount > 0){
                Swal.fire("Success", "Review updated successfully!", "success");
                setEditReview(null);
                setNewComment('');
                setNewRating(0);
                refetch();
            }
        } catch(err){
            console.error(err);
            Swal.fire("Error", "Failed to update review", "error");
        }
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">My Reviews ({reviews.length})</h2>

            <div className="overflow-x-auto">
                <table className="table w-full border border-gray-300 rounded-lg text-sm md:text-base">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
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
                                <td className="border px-3 py-2">{new Date(review.reviewDate).toLocaleDateString()}</td>
                                <td className="flex gap-2 border px-3 py-2 flex-wrap">
                                    <button 
                                        className="btn btn-xs btn-warning"
                                        onClick={() => {
                                            setEditReview(review);
                                            setNewComment(review.reviewComment);
                                            setNewRating(review.ratingPoint);
                                        }}
                                    >
                                        Edit
                                    </button>
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

            {/* Edit Review Modal */}
            {editReview && (
                <dialog open className="modal">
                    <div className="modal-box max-w-lg">
                        <h3 className="text-xl font-semibold mb-3">Edit Review</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="label">Rating (1-5)</label>
                                <div className="flex gap-1">
                                    {[1,2,3,4,5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className={`text-3xl ${star <= newRating ? 'text-yellow-400' : 'text-gray-300'}`}
                                            onClick={() => setNewRating(star)}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="label">Comment</label>
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="textarea textarea-bordered w-full max-h-40 overflow-y-auto"
                                    rows={3}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-full">Update Review</button>
                        </form>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setEditReview(null)}>Close</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default MyReviews;
