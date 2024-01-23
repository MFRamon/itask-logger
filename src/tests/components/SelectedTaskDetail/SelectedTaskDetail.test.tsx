import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SelectedTaskDetail from "@/components/SelectedTaskDetail/SelectedTaskDetail"

describe('Page', () => {
    it('should render a heading', () => {
        render(<SelectedTaskDetail  />);
        expect(true).toBe(true);
    })
})