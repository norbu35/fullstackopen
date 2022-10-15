const { ApolloServer, gql, UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Author = require('./models/AuthorModel');
const Book = require('./models/BookModel');
const User = require('./models/UserModel');

const MONGODB_URI =
  'mongodb+srv://norbu:atlas123@fullstackopen.mg0pikb.mongodb.net/libraryApp?retryWrites=true&w=majority';
const JWT_SECRET = 'secret';

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favouriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        return await Book.find({ author: args.author });
      }
      if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } });
      }
      if (args.author && args.genre) {
        return (
          await Book.find({ author: { name: args.author } }).where('genres')
        ).in([args.genre]);
      }

      return Book.find({});
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser,
  },

  Author: {
    bookCount: async ({ name }) =>
      await Book.collection.countDocuments({ author: name }),
    name: async ({ name }) => {
      const author = await Author.findOne({ name: name });
      return author.name;
    },
  },

  Book: {
    author: async ({ author }) => await Author.findOne({ id: author }),
  },

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username });

      try {
        user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },

    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) return Error('not authenticated');
      if (args.author.length < 5)
        throw new UserInputError(
          "Author's name must be at least 5 characters long"
        );
      if (args.title.length < 2)
        throw new UserInputError(
          "Book's title must be at least 2 characters long"
        );
      const authorName = await Author.findOne({ name: args.author });
      if (!authorName) {
        try {
          const newAuthor = new Author({ name: args.author, born: null });
          await newAuthor.save();
        } catch (error) {
          throw new Error(error.message, {
            invalidArgs: args,
          });
        }
      }
      const author = await Author.findOne({ name: args.author });
      const authorId = author.id;
      const newBook = new Book({ ...args, author: authorId });
      try {
        newBook.save();
      } catch (error) {
        throw new Error(error.message, {
          invalidArgs: args,
        });
      }

      return newBook;
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new Error('not authenticated');
      const author = await Author.findOneAndReplace(
        { name: args.name },
        { born: args.setBornTo }
      );

      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
