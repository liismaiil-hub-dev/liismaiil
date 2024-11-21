import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { spacing, styled, textAlign, useTheme } from '@mui/system';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import { Box, Button, Card as MuiCard, Grid, Typography, Switch, FormControlLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useTablet from '@/store/hooks/useTablet';
import _, { forEach } from 'lodash';

import { toast } from 'react-toastify';
import { gridSpacing } from '@/store/constants/constants';

import { genPassCollaborator } from '@/api/tools';
import { useMutation } from '@apollo/client';
import { ADD_TABLET_TEMPLATE } from '@/graphql/tablet/mutations';
import { number } from 'yup';
import { TabletTemplateTypeData } from '@/api/tablet/tablet.types';

const AyahNumber = styled('div')({
  fontSize: 10,
  borderLeft: 1,
  color: 'black',
  textAlign: 'center'
});
const SurahText = styled('div')({
  fontSize: 13,
  height: 20,
  textAlign: 'end',
  cursor: 'pointer',
  color: 'blue'
});

const AccordionSelfLessons = () => {
  const theme = useTheme();
  const {
    state: { selfLessons }
  } = useLesson();
  const [toggle, setToggle] = useState<unknown | number>(null);
  const [expanded, setExpanded] = useState<number | boolean>(false);
  const [added, setAdded] = useState([-1]);
  const handleChange = (panel: number) => (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    if (toggle !== panel && expanded !== panel) {
      setExpanded(panel);
    } else if (toggle === panel && expanded === false) {
      setExpanded(panel);
    } else setExpanded(false);
    setToggle(panel);
  };

  const [AddTabletTemplate, { data, error, loading }] = useMutation(ADD_TABLET_TEMPLATE);
  useEffect(() => {
    if (data && data.addTabletTemplate && !loading && !error) {
      console.log(data.addTabletTemplate);
    } else if (error) {
      console.log(error);
    } else if (loading) {
      console.log({ loading });
    }
  }, [data, loading, error]);

  const setAyahForWordsHandler = (ayah: IAyah) => {
    setAyahForWords(ayah);
    setOpenWordsDialog(!openWordsDialog);
  };

  const checkBoxSoura = new Set<IAyah>();
  const [ayahStateChecked, setAyahStateChecked] = useState<IAyah[]>([
    {
      number: -1,
      juz: -1,
      numberInSurah: -1,
      text: ''
    }
  ]);

  const okHandler = () => {
    toast.info('OK');
    setOpenAccordion(false);
  };

  const createTabletHandler = (index: number) => {
    // setOpenCardsDialog(true)
    console.log({ index });
    setExpanded(false);
    handleChange(index);
    setOpenCreateTabletDialog(true);
    clearAyahForWords();
  };

  const createTabletTemplate = (ayat: IAyah[], group: number) => {
    const { souraArabName, souraName, souraNb } = ayahsAccordion;

    const description = `${souraName}-${souraNb}-Goup${group} `;
    const ayatWithout_type = ayat.map((aya: IAyah) => {
      const { juz, number, numberInSurah, text, slice } = aya;
      return { juz, number, numberInSurah, text, slice, soura: souraName };
    });
    try {
      AddLessons({
        variables: {
          input: {
            souraNb: `${souraNb}-${group}`,
            souraName,
            description,
            arabName: souraArabName,
            ayahs: ayatWithout_type,
            group
          }
        }
      });
      toast.info(`template tablet ${souraName}  /  souraNb: ${souraNb} has been created `);
    } catch (error) {
      toast.error(`${JSON.stringify(error)} error when update data on firestore`);
      throw error;
    }
  };

  const [groupSelected, setGroupSelected] = useState<number[]>([0]);
  const selectGroupTemplate = (group: number) => {
    if (groupSelected.includes(group)) {
      setGroupSelected((groupSelected) => groupSelected.filter((grp) => grp !== group));
    } else {
      setGroupSelected((groupSelected) => [...groupSelected, group]);
    }
  };

  return (
    <Box sx={{ width: '100%' }} key={`${template['souraNb']}`}>
      <MuiAccordion
        key={`${template.ayahs.length}-${template['group']}`}
        defaultExpanded={false}
        expanded={expanded === template['group']}
        onChange={handleChange(template['group'] as number)}
      >
        <MuiAccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ color: 'grey.800', fontWeight: 500 }}>
          {`${template['arabName']} (${template.ayahs.length} Ayahs)`}
          {` ${template['group']}group selected  )`}
        </MuiAccordionSummary>
        <MuiAccordionDetails>
          <Grid container flexDirection={'column'}>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    color="primary"
                    checked={groupSelected.includes(template['group'])}
                    onChange={() => {
                      selectGroupTemplate(template['group'] as number);
                    }}
                    name="allSliceChecked"
                  />
                }
                label="Select group"
              />
            </Grid>
            <Grid item display={'flex'} style={{ border: 'solid 1px blue ', borderRadius: '2px' }} flexDirection={'column'}>
              {template.ayahs &&
                template.ayahs.map((ayah: IAyah, index: number) => (
                  <Grid
                    container
                    flexDirection={'row'}
                    key={`${ayah.numberInSurah}-${index}`}
                    justifyContent="space-between"
                    alignItems={'center'}
                    style={{ borderBottom: '1px green solid' }}
                  >
                    <Grid item sm={1} alignSelf="flex-start">
                      <AyahNumber>{ayah['numberInSurah']} </AyahNumber>
                    </Grid>
                    <Grid item sm={11} alignSelf="flex-end">
                      <SurahText onClick={() => setAyahForWordsHandler(ayah)}>{ayah.text}</SurahText>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </MuiAccordionDetails>
      </MuiAccordion>
    </Box>
  );
};

export default AccordionSelfLessons;
