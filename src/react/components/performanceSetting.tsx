import { Stack, TextField, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { reduxAction } from '../redux/slice';

export function PerformanceSetting() {
  const performance = useAppSelector(state => state.performance);
  const dispatch = useAppDispatch();

  const onChange = React.useCallback(
    (type: 'cpu' | 'gpu' | 'memory') =>
      (
        e:
          | SelectChangeEvent
          | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const newVal = parseInt(e.target.value + '');
        const newPerf = performance ? { ...performance } : {};
        newPerf.cpu = newPerf.cpu ?? 2;
        newPerf.gpu = newPerf.gpu ?? 1;
        newPerf.memory = newPerf.memory ?? 2;
        newPerf[type] = newVal;
        dispatch(reduxAction.setPerformance(newPerf));
      },
    [performance, dispatch]
  );

  return (
    <Stack spacing={2} className="jp-deai-performance-setting">
      <Typography sx={{ fontSize: '0.85rem' }}>
        Please set the performance profile to be used.
      </Typography>
      <FormControl sx={{ width: '100%' }} size="small">
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{ fontSize: '0.9rem' }}
        >
          Number of CPU core
        </InputLabel>
        <Select
          value={(performance?.cpu ?? 2) + ''}
          label="Number of CPU core"
          fullWidth={true}
          sx={{ '& .MuiInputBase-inputSizeSmall': { fontSize: '0.9rem' } }}
          onChange={onChange('cpu')}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={16}>16</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: '100%' }} size="small">
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{ fontSize: '0.9rem' }}
        >
          Number of GPU
        </InputLabel>
        <Select
          value={(performance?.gpu ?? 1) + ''}
          label="Number of GPU"
          fullWidth={true}
          sx={{ '& .MuiInputBase-inputSizeSmall': { fontSize: '0.9rem' } }}
          onChange={onChange('gpu')}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={16}>16</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: '100%' }} size="small">
        <TextField
          label="Memory size in GB"
          sx={{ '& .MuiInputBase-inputSizeSmall': { fontSize: '0.9rem' } }}
          type="number"
          size="small"
          value={performance?.memory ?? 2}
          onChange={onChange('memory')}
        />
      </FormControl>
    </Stack>
  );
}
