const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language }
}) => {
  return (
    <li className='movie-card'>
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        onError={(e) => {
          e.target.src = 'no-movie.png';
        }}
        alt={title}
        className='movie-card__image'
      />
      <div className='mt-4'>
        <h3>{title}</h3>
        <div className='content'>
          <div className='rating'>
            <img src='star.svg' alt='Star icon' />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>
          <span>•</span>
          <p className='lang'>{original_language}</p>
          <span>•</span>
          <p className='year'>
            {release_date ? release_date.split('-')[0] : 'N/A'}
          </p>
        </div>
      </div>
    </li>
  );
};

export default MovieCard;

/* DATA
"adult": false,
"backdrop_path": "/j0NUh5irX7q2jIRtbLo8TZyRn6y.jpg",
"genre_ids": [
    27,
    9648
],
"original_title": "Final Destination Bloodlines",
"overview": "Plagued by a violent recurring nightmare, college student Stefanie heads home to track down the one person who might be able to break the cycle and save her family from the grisly demise that inevitably awaits them all.",
"popularity": 386.4101,
"video": false,
"vote_count": 192
*/
