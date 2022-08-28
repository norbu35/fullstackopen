import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import BlogForm from './BlogForm';

describe('<Blog>', () => {
  let container;
  let user = userEvent.setup();
  const mockHandler = jest.fn();

  const blog = {
    title: 'How to write Jest tests',
    author: 'The Joker',
    url: 'www.secret.com',
    likes: 5,
    user: {
      name: 'Jest',
    },
  };

  beforeEach(() => {
    container = render(<Blog blog={blog} handleLike={mockHandler} />).container;
  });

  test('the author and title should be rendered, url and likes should not be visible by default', () => {
    screen.getByText('How to write Jest tests', { exact: false });
    screen.getByText('The Joker', { exact: false });
    const togglable = container.querySelector('.togglable');
    expect(togglable).toHaveStyle({ display: 'none' });
  });

  test('url and likes are shown after clicking button', async () => {
    const button = container.querySelector('#view');

    const togglable = container.querySelector('.togglable');
    expect(togglable).toHaveStyle({ display: 'none' });

    await user.click(button);
    expect(togglable).toHaveStyle({ display: 'block' });
  });

  test('when like button is clicked twice, the event handler is called twice', async () => {
    const likeButton = container.querySelector('#like');
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });

  test('form calls event handler with right details', async () => {
    user = userEvent.setup();
    const addBlog = jest.fn();
    container = render(<BlogForm addBlog={addBlog} />).container;

    const input = screen.getAllByRole('textbox');
    const submitButton = container.querySelector('#submit');

    await user.type(input[0], 'blog title');
    await user.type(input[1], 'blog author');
    await user.type(input[2], 'blog url');
    await user.click(submitButton);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toContain('blog title');
    expect(addBlog.mock.calls[0][0].author).toContain('blog author');
    expect(addBlog.mock.calls[0][0].url).toContain('blog url');
  });
});
