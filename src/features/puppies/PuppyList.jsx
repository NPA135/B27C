import { useGetPuppiesQuery } from "../../api/api";
import { useDispatch } from "react-redux";
import { setSelectedPuppyId } from "./puppySlice";

/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
export default function PuppyList() {
  const dispatch = useDispatch();
  const { data: puppies, isLoading } = useGetPuppiesQuery();

  return (
    <article>
      <h2>Roster</h2>
      <ul className="puppies">
        {isLoading && <li>Loading puppies...</li>}
        {puppies?.map((p) => (
          <li key={p.id} className="puppy-card">
            <h3>{p.name} #{p.id}</h3>
            <figure>
              <img src={p.imageUrl} alt={p.name} />
            </figure>
            <button onClick={() => dispatch(setSelectedPuppyId(p.id))}>
              See details
            </button>
          </li>
        ))}
      </ul>
    </article>
  );
}
