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
  TextField,
  debounce,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import { KeywordItem, client } from '../../api/tmdb';
import { useAppSelector } from '../../hooks';

// const keywordsOptions: KeywordItem[] = [
//   { id: 1, name: 'brave' },
//   { id: 2, name: 'love' },
//   { id: 3, name: 'courage' },
// ];

// const selected = [keywordsOptions[1], keywordsOptions[2]];

export interface Filters {
  keywords: KeywordItem[];
  genres: number[];
}

// interface KeywordItem {
//   id: number;
//   name: string;
// }

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

  const [keywordsLoading, setKeywordsLoading] = useState(false);
  const [keywordsOptions, setKeywordsOptions] = useState<KeywordItem[]>([]);

  const genres = useAppSelector((state) => state.movies.genres);

  const fetchKeywords = useMemo(
    () =>
      debounce(async (query) => {
        if (query) {
          setKeywordsLoading(true);

          const options = await client.getKeywords(query);

          setKeywordsLoading(false);
          setKeywordsOptions(options);
        } else {
          setKeywordsOptions([]);
        }
      }, 1000),
    []
  );

  return (
    <Paper sx={{ m: 2, p: 0.5 }}>
      <form onSubmit={handleSubmit(onApply)}>
        <FormControl sx={{ m: 2, display: 'block' }} component='fieldset' variant='standard'>
          <Controller
            name='keywords'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                multiple
                disablePortal
                // loading={false}
                loading={keywordsLoading}
                options={keywordsOptions}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option.name}
                onChange={(_, value) => onChange(value)}
                // value={selected}
                value={value}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onInputChange={(_, value) => fetchKeywords(value)}
                renderInput={(params) => <TextField {...params} label='Keywords' />}
              />
            )}
          />
        </FormControl>

        <FormControl sx={{ m: 2, display: 'block' }} component='fieldset' variant='standard'>
          <FormLabel component='legend'>Genres</FormLabel>
          <FormGroup sx={{ maxHeight: 500 }}>
            <Controller
              name='genres'
              control={control}
              render={({ field }) => (
                <>
                  {genres.map((genre) => (
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
        </FormControl>

        <Button sx={{ m: 2 }} type='submit' variant='contained' startIcon={<FilterAltOutlinedIcon />}>
          Apply filter
        </Button>
      </form>
    </Paper>
  );
}