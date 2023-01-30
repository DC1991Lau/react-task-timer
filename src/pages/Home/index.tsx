import { Hand, Play } from "phosphor-react";

import { NewCycleFormData } from "../../schemas/index";

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from "./styles";
import { useEffect, useState } from "react";
import Countdown from "./components/Countdown";
import NewCycleForm from "./components/NewCycleForm";

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startedDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

  const activeCycle = cycles.find((cycle: Cycle) => cycle.id === activeCycleId);

  function handleCreateNewCicle(data: NewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedDate: new Date(),
    };
    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    reset();
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setActiveCycleId(null);
  }

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch("task");
  const isSubmitDisabled = !task;

  console.log(cycles);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <NewCycleForm />
        <Countdown
          minutes={minutes}
          seconds={seconds}
          activeCycle={activeCycle}
        />
        {!activeCycle ? (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        ) : (
          <StopCountDownButton
            disabled={!activeCycle && isSubmitDisabled}
            type="button"
            onClick={handleInterruptCycle}
          >
            <Hand size={24} />
            Interromper
          </StopCountDownButton>
        )}
      </form>
    </HomeContainer>
  );
}
