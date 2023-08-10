import { Stack, Typography } from '@mui/material';
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
        const newVal = parseFloat(e.target.value + '');
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
          {[0.1, 0.5, 1, 2, 4, 6, 8, 10, 12, 16, 32, 64, 128, 192, 256].map(
            (val, idx) => (
              <MenuItem key={idx} value={val}>
                {val}
              </MenuItem>
            )
          )}
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
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((val, idx) => (
            <MenuItem key={idx} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: '100%' }} size="small">
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{ fontSize: '0.9rem' }}
        >
          Memory size
        </InputLabel>
        <Select
          value={(performance?.memory ?? 2) + ''}
          label="Memory size"
          fullWidth={true}
          sx={{ '& .MuiInputBase-inputSizeSmall': { fontSize: '0.9rem' } }}
          onChange={onChange('memory')}
        >
          {[
            0.5, 1, 2, 4, 6, 8, 10, 12, 16, 32, 64, 128, 256, 384, 512, 640
          ].map((val, idx) => (
            <MenuItem key={idx} value={val}>
              {`${val} Gb`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
