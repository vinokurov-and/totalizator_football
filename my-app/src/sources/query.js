import { gql } from '@apollo/client';

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
  query($id: ID) {
    Tours(id: $id) {
      name
    }
  }
`;

// TEAMS
export const GET_TEAMS = gql`
  query {
    Teams {
      id
      name
    }
  }
`;

// Получить новые игры турниров
export const GET_NEW_GAMES_TOURNAMENTS = gql`
  query {
    NewGamesTournaments {
      id
      name
      tour {
        name
        game {
          home {
            name
          }
          guest {
            name
          }
        }
      }
    }
  }
`;
