import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ItemList from "../components/ItemList";

jest.mock("../security/fetchWithAuth", () => ({
    fetchGetWithAuth: jest.fn(),
}));

import { fetchGetWithAuth } from "../security/fetchWithAuth";

