import React from "react";
import type { Quote } from "../types/quote";

type Props = {
    quotes: Quote[];
    loading: boolean;
    onChangeStatus: (id: string, status: string) => void;
    onDelete: (id: string) => void;
};

export default function QuotesTable({
    quotes,
    loading,
    onChangeStatus,
    onDelete,
}: Props) {
    if (loading) {
        return <div className="loading">Loading quotes...</div>;
    }

    if (quotes.length === 0) {
        return <div className="empty-state">No quotes found</div>;
    }

    return (
        <table className="dash-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {quotes.map((q) => (
                    <tr key={q._id}>
                        <td>{q.firstName}</td>
                        <td>{q.email}</td>
                        <td>{q.city}</td>
                        <td>{q.service}</td>

                        <td>
                            <span className={`status-pill status-${q.status}`}>
                                {q.status}
                            </span>
                        </td>

                        <td>
                            <div className="action-btns">
                                <select
                                    className="select-status"
                                    value={q.status}
                                    onChange={(e) => onChangeStatus(q._id, e.target.value)}
                                >
                                    <option value="pending">pending</option>
                                    <option value="confirmed">confirmed</option>
                                    <option value="done">done</option>
                                    <option value="refused">refused</option>
                                </select>

                                <button
                                    className="btn-delete"
                                    onClick={() => onDelete(q._id)}
                                >
                                    delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}