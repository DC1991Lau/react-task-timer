import { useContext } from "react";
import { CyclesContext } from "../../context/CyclesContext";
import { HistoryList, HistoryContainer, Status } from "./styles";

import { formatDistanceToNow } from "date-fns";
import ptPT from "date-fns/locale/pt";

export function History() {
  const { cycles } = useContext(CyclesContext);
  return (
    <HistoryContainer>
      <h1>Meu Historico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles?.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startedDate), {
                    addSuffix: true,
                    locale: ptPT,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor="green">Concluido</Status>
                  )}
                  {cycle.interruptedDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
