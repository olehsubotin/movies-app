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
        height={288}
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
