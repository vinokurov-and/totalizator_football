import { useLazyQuery, gql } from '@apollo/client';

// USER
export const GET_USER = gql`
  query($id: ID) {
    User(id: $id) {
      isAdmin
      name
    }
  }
`;

// TOURNAMENT
export const GET_TOURNAMENTS = gql`
  query {
    Tournaments {
      name
      id
    }
  }
`;

// TOURS
export const GET_TOURS = gql`
  query {
    Tours {
      name
    }
  }
`;
