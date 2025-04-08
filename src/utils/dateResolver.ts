import { GraphQLScalarType, Kind } from 'graphql';

export const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Date Scalar Type',
    serialize(value) {
        return value instanceof Date ? value.toISOString() : null;
    },
    parseValue(value) {
        return new Date(value as string);
    },
    parseLiteral(ast) {
        return ast.kind === Kind.STRING ? new Date(ast.value) : null;
    },
});
