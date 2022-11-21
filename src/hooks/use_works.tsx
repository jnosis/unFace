import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import workService from '../api/work';

export default function useWorks() {
  const queryClient = useQueryClient();

  const worksQuery = useQuery(['works'], () => workService.getWorks(), {
    staleTime: 1000 * 60 * 60,
  });

  const workQuery = (title: string) =>
    useQuery(['works', title], () => workService.getWorkByTitle(title), {
      staleTime: 1000 * 60 * 60,
    });

  const addWork = useMutation(
    (work: WorkInputData) => workService.addWork(work),
    { onSuccess: () => queryClient.invalidateQueries(['works']) }
  );

  const updateWork = useMutation(
    (work: WorkInputData) => workService.updateWork(work),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['works']);
        queryClient.invalidateQueries(['works', data.title]);
      },
    }
  );

  const deleteWork = useMutation(
    (work: WorkData) => workService.deleteWork(work),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['works']);
        queryClient.invalidateQueries(['works', data]);
      },
    }
  );

  return { worksQuery, workQuery, addWork, updateWork, deleteWork };
}
