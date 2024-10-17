import { useGetPuppyQuery, useDeletePuppyMutation } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedPuppyId } from "./puppySlice";

/**
 * @component
 * Shows comprehensive information about the selected puppy, if there is one.
 */
export default function PuppyDetails() {
  const dispatch = useDispatch();
  const selectedPuppyId = useSelector((state) => state.puppies.selectedPuppyId);
  const { data: puppy, isLoading } = useGetPuppyQuery(selectedPuppyId, {
    skip: !selectedPuppyId,
  });
  const [deletePuppy] = useDeletePuppyMutation();

  function removePuppy(id) {
    deletePuppy(id).then(() => dispatch(clearSelectedPuppyId()));
  }

  if (!selectedPuppyId) return <p>Please select a puppy to see more details.</p>;

  return (
    <aside>
      <h2>Selected Puppy</h2>
      {isLoading ? (
        <p>Loading puppy information...</p>
      ) : (
        <>
          <h3>{puppy.name} #{puppy.id}</h3>
          <p>{puppy.breed}</p>
          <p>Team: {puppy.team?.name ?? "Unassigned"}</p>
          <button onClick={() => removePuppy(puppy.id)}>Remove from roster</button>
          <figure>
            <img src={puppy.imageUrl} alt={puppy.name} />
          </figure>
        </>
      )}
    </aside>
  );
}
