import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MyProfile from "../components/MyProfile";

jest.mock("../security/fetchWithAuth", () => ({
    fetchGetWithAuth: jest.fn(),
}));

import { fetchGetWithAuth } from "../security/fetchWithAuth";

describe("MyProfile Component", () => {
    test("renders profile info and posts when fetch is successful", async () => {
        fetchGetWithAuth.mockResolvedValueOnce({
            username: "testuser",
            email: "test@example.com",
            createdAt: new Date("2025-04-19T12:00:00Z").toISOString(),
            posts: [
                {
                    id: 1,
                    content: "First post",
                    createdAt: new Date("2025-04-19T13:00:00Z").toISOString(),
                },
                {
                    id: 2,
                    content: "Second post",
                    createdAt: new Date("2025-04-19T14:00:00Z").toISOString(),
                },
            ],
        });

        render(<MyProfile />);

        // Wait for username to appear
        await waitFor(() => {
            expect(screen.getByText(/Hello, testuser/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/First post/i)).toBeInTheDocument();
        expect(screen.getByText(/Second post/i)).toBeInTheDocument();
    });

    test("shows loading while fetching", () => {
        fetchGetWithAuth.mockReturnValue(new Promise(() => { }));

        render(<MyProfile />);
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    test("shows error when fetch fails", async () => {
        fetchGetWithAuth.mockRejectedValueOnce(new Error("Fetch failed"));

        render(<MyProfile />);

        await waitFor(() =>
            expect(screen.getByText(/Error: Fetch failed/i)).toBeInTheDocument()
        );
    });
});
