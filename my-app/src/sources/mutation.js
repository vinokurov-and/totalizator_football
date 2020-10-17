import { gql } from '@apollo/client';

// // TOURNAMENT
// export const SET_TOURNAMENT = gql`
//   mutation($name: String) {
//     addTournament(name: $name) {
//       id
//       name
//     }
//   }
// `;

// GAMES
export const SET_GAMES = gql`
  #   input CalendarInput {
  #     home: String!
  #     guest: String!
  #     tournament: String
  #     stage: String!
  #     newTournament: String
  #   }

  mutation AddGames($input: [CalendarInput]) {
    addGames(input: $input) {
      id
      home {
        name
      }
      guest {
        name
      }
      tournament {
        name
      }
      stage
    }
  }
`;
