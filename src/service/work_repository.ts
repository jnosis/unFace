import { FirebaseApp } from 'firebase/app';
import FirebaseDB from 'firebase/database';

class WorkRepository {
  private readonly database: FirebaseDB.Database;

  constructor(app: FirebaseApp) {
    this.database = FirebaseDB.getDatabase(app);
  }

  syncWorks(userId: string, onUpdate: Function) {
    const query = FirebaseDB.ref(this.database, `${userId}/works`);
    FirebaseDB.onValue(query, (snapshot) => {
      const value = snapshot.val();
      value && onUpdate(value);
    });
  }

  saveWork(userId: string, work: WorkData) {
    FirebaseDB.set(
      FirebaseDB.ref(this.database, `${userId}/works/${work.id}`),
      work
    );
  }

  deleteWork(userId: string, work: WorkData) {
    FirebaseDB.remove(
      FirebaseDB.ref(this.database, `${userId}/works/${work.id}`)
    );
  }
}

export default WorkRepository;
