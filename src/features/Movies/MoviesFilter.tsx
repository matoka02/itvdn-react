import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Paper,
  Skeleton,
  TextField,
  debounce,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

// import { KeywordItem, client } from '../../api/tmdb';
import { KeywordItem, useGetGenresQuery, useGetKeywordsQuery } from '../../services/tmdb';
// import { useAppSelector } from '../../hooks';

export interface Filters {
  keywords: KeywordItem[];
  genres: number[];
}

interface MoviesFilterProps {
  onApply(filters: Filters): void;
}

export function MoviesFilter({ onApply }: MoviesFilterProps) {
  const { control, handleSubmit, formState } = useForm<Filters>({
    defaultValues: {
      keywords: [],
      genres: [],
    },
  });

  // const [keywordsLoading, setKeywordsLoading] = useState(false);
  // const [keywordsOptions, setKeywordsOptions] = useState<KeywordItem[]>([]);

  const [keywordsQuery, setKeywordsQuery] = useState<string>("");
  const { data: keywordsOptions = [], isLoading: keywordsLoading } = useGetKeywordsQuery(keywordsQuery, { skip: !keywordsQuery });
  const { data: genres = [], isLoading: genresLoading } = useGetGenresQuery();

  // const genres = useAppSelector((state) => state.movies.genres);

  // const fetchKeywordsOptions = async (query: string) => {
  //   if (query) {
  //     setKeywordsLoading(true);
  //     const options = await client.getKeywords(query);
  //     setKeywordsLoading(false);
  //     setKeywordsOptions(options);
  //   } else {
  //     setKeywordsOptions([]);
  //   }
  // };

  // const debouncedFetchKeywordsOptions = useMemo(() => debounce(fetchKeywordsOptions, 1000), [] );
  const debouncedFetchKeywordsOptions = useMemo(
    () =>
      debounce((query: string) => {
        setKeywordsQuery(query);
      }, 1000),
    []
  );

  return (
    <Paper sx={{ m: 2, p: 0.5, maxWidth: 350 }}>
      <form onSubmit={handleSubmit(onApply)}>
        <FormControl sx={{ m: 2, display: 'block' }} component='fieldset' variant='standard'>
          <Controller
            name='keywords'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                disablePortal
                loading={keywordsLoading}
                options={keywordsOptions}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => onChange(value)}
                value={value}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onInputChange={(_, value) => debouncedFetchKeywordsOptions(value)}
                renderInput={(params) => <TextField {...params} label='Keywords' />}
              />
            )}
          />
        </FormControl>

        <FormControl sx={{ m: 2, display: 'block' }} component='fieldset' variant='standard'>
          {/* <FormLabel component='legend'>Genres</FormLabel>
          <FormGroup sx={{ maxHeight: 500 }}>
            <Controller
              name='genres'
              control={control}
              render={({ field }) => (
                <>
                  {genres?.map((genre) => (
                    <FormControlLabel
                      key={genre.id}
                      control={
                        <Checkbox
                          value={genre.id}
                          checked={field.value.includes(genre.id)}
                          onChange={(event, checked) => {
                            const valueNumber = Number(event.target.value);
                            if (checked) {
                              field.onChange([...field.value, valueNumber]);
                            } else {
                              field.onChange(field.value.filter((value) => value !== valueNumber));
                            }
                          }}
                        />
                      }
                      label={genre.name}
                    />
                  ))}
                </>
              )}
            />
          </FormGroup> */}

          {genresLoading ? (
            <Skeleton width={300} height={480} />
          ) : (
            <>
              <FormLabel component='legend'>Genres</FormLabel>
              <FormGroup sx={{ maxHeight: 500 }}>
                <Controller
                  name='genres'
                  control={control}
                  render={({ field }) => (
                    <>
                      {genres?.map((genre) => (
                        <FormControlLabel
                          key={genre.id}
                          control={
                            <Checkbox
                              value={genre.id}
                              checked={field.value.includes(genre.id)}
                              onChange={(event, checked) => {
                                const valueNumber = Number(event.target.value);
                                if (checked) {
                                  field.onChange([...field.value, valueNumber]);
                                } else {
                                  field.onChange(field.value.filter((value) => value !== valueNumber));
                                }
                              }}
                            />
                          }
                          label={genre.name}
                        />
                      ))}
                    </>
                  )}
                />
              </FormGroup>
            </>

          )}
        </FormControl>

        <Button sx={{ m: 2 }} type='submit' variant='contained' startIcon={<FilterAltOutlinedIcon />} disabled={!formState.isDirty}>
          Apply filter
        </Button>
      </form>
    </Paper>
  );
}
