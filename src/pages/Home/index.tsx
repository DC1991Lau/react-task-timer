import { useContext } from "react";

import {
  NewCycleFormData,
  newCycleFormValidationSchema,
} from "../../schemas/index";

import { Hand, Play } from "phosphor-react";

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import Countdown from "./components/Countdown";
import NewCycleForm from "./components/NewCycleForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../context/CyclesContext";

export function Home() {
  const { activeCycle, createNewCicle, interruptCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCicle(data);
    reset();
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {!activeCycle ? (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        ) : (
          <StopCountDownButton
            disabled={!activeCycle && isSubmitDisabled}
            type="button"
            onClick={interruptCycle}
          >
            <Hand size={24} />
            Interromper
          </StopCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
