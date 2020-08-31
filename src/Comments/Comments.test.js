import React from 'react'
import Comments from './Comments'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';

describe('Comments component', () => {
  it('should display the movies comments when rendered', () => {
    
    let comment1 = {
      author: 'Diana',
      comment: 'Great movie!'
    }

    render(
      <BrowserRouter>
        <Comments
          comments={[comment1]}
        />
      </BrowserRouter>
    )

    const author = screen.getByText('- Diana')
    const comment = screen.getByText('Great movie!')

    expect(author).toBeInTheDocument()
    expect(comment).toBeInTheDocument()

  })
})