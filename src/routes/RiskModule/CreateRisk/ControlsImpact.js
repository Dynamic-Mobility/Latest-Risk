import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Grid, Box, Select } from "@mui/material";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { getAutoCompleteValue } from "../../../@dmt/Utils/commonHelper";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {
  fetchAllPriorities,
  fetchAllCurrencies,
} from "../../../Redux/features/Subsidiaries";

const ControlsImpact = (props) => {
  const { riskDetails, setRiskDetails, index, handleOnSaveAction } = props;
  const { currencies, priorities, riskFrequencies } = useSelector(
    ({ subsidiary }) => subsidiary
  );

  const options = ["Both", "Quantitative", "Qualitative"];
  const dispatch = useDispatch();

  const handleOnDateChange = (e) => {
    const { name, value } = e.target;
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      [name]: value,
      complianceDetails: {
        ...data[index].complianceDetails,
        submissionDeadline: value,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  
  const handlePenaltyTypeChange = (event, values) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        penaltyTypeName: values,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  const handlePriorityChange = (e) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        priority: e.target.value,
      },
    };
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data,
    });
  };

  const handlePenalty = (e) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        penalty: e.target.value,
      },
    };
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data,
    });
  };

  const handleNarrative = (e) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        penaltyNarrative: e.target.value,
      },
    };
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data,
    });
  };

  const handlePenaltyCurrency = (e) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...data[index].complianceDetails,
        penaltyCurrency: e.target.value,
      },
    };
    setRiskDetails({
      ...riskDetails,
      additionalControlActions: data,
    });
  };

  const handleFrequency = (e, value) => {
    let data = riskDetails.additionalControlActions;
    data[index] = {
      ...data[index],
      complianceDetails: {
        ...riskDetails.additionalControlActions[index].complianceDetails,
        frequencyId: value.id,
      },
    };
    setRiskDetails({ ...riskDetails, additionalControlActions: data });
  };

  useEffect(() => {
    dispatch(fetchAllPriorities());
    dispatch(fetchAllCurrencies());
  }, []);

  return (
    <>
      <Grid container>
        <Grid item md={12} xs={12}>
          <Autocomplete
            fullWidth
            options={options}
            value={
              riskDetails?.additionalControlActions[index]?.complianceDetails
                .penaltyTypeName
            }
            getOptionLabel={(option) => option}
            onChange={handlePenaltyTypeChange}
            renderInput={(params) => (
              <TextField
                sx={{ marginTop: 2 }}
                required
                fullWidth
                {...params}
                size={"small"}
                variant={"outlined"}
                label="Penalty Type"
              />
            )}
          />
        </Grid>
        {riskDetails?.additionalControlActions[index]?.complianceDetails
          ?.penaltyTypeName === options[0] && (
          <>
            <Grid item md={12} xs={12}>
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                label="Penalty"
                type={"number"}
                variant="outlined"
                value={
                  riskDetails?.additionalControlActions[index]
                    ?.complianceDetails?.penalty
                }
                onChange={handlePenalty}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TextField
                        select
                        style={{ width: "90px" }}
                        label=""
                        value={
                          riskDetails?.additionalControlActions[index]
                            ?.complianceDetails?.penaltyCurrency
                        }
                        onChange={handlePenaltyCurrency}
                        InputProps={{
                          disableUnderline: true,
                        }}
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                multiline
                minRows={4}
                variant="outlined"
                label={"Narrative"}
                value={
                  riskDetails?.additionalControlActions[index]
                    ?.complianceDetails?.penaltyNarrative
                }
                onChange={handleNarrative}
              />
            </Grid>
          </>
        )}
        {riskDetails?.additionalControlActions[index]?.complianceDetails
          ?.penaltyTypeName === options[1] && (
          <Grid item md={12} xs={12}>
            <TextField
              sx={{ marginTop: 2 }}
              fullWidth
              label="Penalty"
              type={"number"}
              variant="outlined"
              value={
                riskDetails?.additionalControlActions[index]?.complianceDetails
                  ?.penalty
              }
              onChange={handlePenalty}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TextField
                      select
                      style={{ width: "90px" }}
                      label=""
                      variant="standard"
                      value={
                        riskDetails?.additionalControlActions[index]
                          ?.complianceDetails?.penaltyCurrency
                      }
                      onChange={handlePenaltyCurrency}
                      InputProps={{
                        disableUnderline: true,
                      }}
                    >
                      {currencies?.map((option) => (
                        <MenuItem key={option.id} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        )}
        {riskDetails?.additionalControlActions[index]?.complianceDetails
          ?.penaltyTypeName === options[2] && (
          <Grid item md={12} xs={12}>
            <TextField
              sx={{ marginTop: 2 }}
              fullWidth
              multiline
              minRows={4}
              variant="outlined"
              label={"Narrative"}
              value={
                riskDetails?.additionalControlActions[index]?.complianceDetails
                  ?.penaltyNarrative
              }
              onChange={(e) =>
                setRiskDetails({
                  ...riskDetails,
                  complianceDetails: {
                    ...riskDetails.complianceDetails,
                    penaltyNarrative: e.target.value,
                  },
                })
              }
            />
          </Grid>
        )}
        <Grid item md={12} xs={12}>
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={
                riskDetails.additionalControlActions[index].complianceDetails
                  .priority
              }
              label="Priority"
              onChange={handlePriorityChange}
            >
              {priorities?.map((item, index) => (
                <MenuItem value={item.name} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12} xs={12}>
          <Autocomplete
            fullWidth
            options={riskFrequencies}
            onChange={handleFrequency}
            value={getAutoCompleteValue(
              riskFrequencies,
              riskDetails?.additionalControlActions[index]?.complianceDetails
                ?.frequencyId
            )}
            getOptionLabel={(option) => option.name}
            // renderOption={(option, { selected }) => (
            //   <span key={option.id}>{option.name}</span>
            // )}
            renderInput={(params) => (
              <TextField
                sx={{ marginTop: 2 }}
                fullWidth
                {...params}
                size={"small"}
                variant={"outlined"}
                label="Frequency"
              />
            )}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          {/* <DatePicker
            autoOk
            fullWidth
            clearable
            inputVariant={'outlined'}
            label="Action Date"
            onChange={date => {
              setSelectedActionDate(date);
            }}
            value={riskDetails?.additionalControlActions[index].actionDate !== '' ? riskDetails.additionalControlActions[index].actionDate : selectedActionDate}
            format="DD-MM-yyyy"
            animateYearScrolling
          /> */}
          <TextField
            sx={{ marginTop: 2 }}
            label={"Action Date"}
            name="actionDate"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleOnDateChange}
            fullWidth
            type="date"
            value={riskDetails?.additionalControlActions[index]?.actionDate}
            variant="outlined"
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button variant={"outlined"} onClick={handleOnSaveAction}>
              Save Action
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ControlsImpact;
