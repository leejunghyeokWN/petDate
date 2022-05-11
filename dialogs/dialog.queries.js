import client from '../client';
export default {
  Query:{
    dialogs: () => client.dialog.findMany(),
    dialog: (_, { id }) => client.dialog.findUnique({where: { id }}),
  },
};