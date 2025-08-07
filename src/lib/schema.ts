import { co, Group } from 'jazz-tools';
import { Task } from './task';

export const Profile = co.profile();

export const Root = co.map({
	inbox: co.list(Task),
	collection: co.list(Task)
});

export const Account = co.account({
  profile: Profile,
  root: Root,
}).withMigration((account) => {
  if (account.root === undefined) {
    const group = Group.create()

    account.root = Root.create(
      {
        inbox: [],
        collection: []
      },
      group,
    )
  }

  if (account.profile === undefined) {
    const group = Group.create();
    group.addMember("everyone", "reader");

    account.profile = Profile.create(
      {
        name: "",
      },
      group,
    )
  }
})
