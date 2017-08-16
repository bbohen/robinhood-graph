const { GraphQLScalarType } = require('graphql');
const { GraphQLError } = require('graphql/error');
const { Kind } = require('graphql/language');

function parser(ast) {
  const regex = new RegExp('^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$', 'i');
  if (!regex.test(ast.value)) {
    throw new GraphQLError('Query error: URL Scalar ', [ast]);
  }

  return ast.value;
}

const typeDefs = `
  scalar Url
`;
const resolvers = {
  Url: new GraphQLScalarType({
    name: 'Url',
    description: 'Url custom scalar type',
    serialize: value => value,
    parseValue: (value) => {
      const ast = {
        kind: Kind.STRING,
        value
      };

      return parser(ast);
    },
    parseLiteral: ast => parser(ast)
  })
};

module.exports = {
  resolvers,
  typeDefs
};
