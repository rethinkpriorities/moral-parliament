import React from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";

import { InfoTag } from "../InfoTag";

import { Label, IconContainer, Input, Warning } from "./FieldGroup.styles";

interface WorldviewFieldGroupProps {
  fields: (keyof Worldview)[];
  fieldLabels: Record<keyof Worldview, string>;
  tags: Record<keyof Worldview, string>;
  selectedItem: Worldview;
  updateItem: (arg0: Partial<Worldview>) => void;
  normalize: boolean;
}
interface ProjectFieldGroupProps {
  fields: (keyof Project)[];
  fieldLabels: Record<keyof Project, string>;
  tags: Record<keyof Project, string>;
  selectedItem: Project;
  updateItem: (arg0: Partial<Project>) => void;
  normalize: boolean;
}

type FieldGroupProps = WorldviewFieldGroupProps | ProjectFieldGroupProps;
export const FieldGroup = ({
  fields,
  fieldLabels,
  tags,
  selectedItem,
  updateItem,
  normalize = false,
}: FieldGroupProps) => {
  type ModelType = typeof selectedItem;
  type ModelKey = keyof ModelType;

  const [valuesLocked, setValuesLocked] = React.useState<
    Record<ModelKey, boolean>
  >({} as Record<ModelKey, boolean>);

  const [values, setValues] = React.useState<Record<ModelKey, string>>(
    (fields as ModelKey[]).reduce(
      (acc, key) => {
        return fields.includes(key)
          ? { ...acc, [key]: selectedItem[key] as string }
          : acc;
      },
      {} as Record<ModelKey, string>
    )
  );

  React.useEffect(
    () => {
      setValues(
        (fields as ModelKey[]).reduce(
          (acc, key) => {
            return fields.includes(key)
              ? { ...acc, [key]: selectedItem[key] as string }
              : acc;
          },
          {} as Record<ModelKey, string>
        )
      );
    },
    fields.map((f) => selectedItem[f])
  );
  const renormalizeAround = (field: ModelKey) => {
    const lockedSum: number = fields.reduce(
      (acc: number, k) =>
        acc +
        (valuesLocked[k as ModelKey] && k !== field
          ? parseFloat(values[k as ModelKey]) ?? 0
          : 0),
      0
    );
    const renormalizeTo = 1 - parseFloat(values[field] ?? 0) - lockedSum;
    const currentSum = (
      fields.filter(
        (k) => k !== field && !valuesLocked[k as ModelKey]
      ) as (keyof typeof values)[]
    ).reduce(
      (acc: number, k: keyof typeof values) =>
        acc + parseFloat(values[k]) ?? 0 + 0.00001,
      0
    );
    const renormalizedObject = fields.reduce(
      (acc, k: string) => ({
        ...acc,
        [k]: valuesLocked[k as ModelKey]
          ? parseFloat(values[k as ModelKey])
          : Math.round(
              (((parseFloat(values[k as ModelKey]) + 0.00001) * renormalizeTo) /
                currentSum) *
                10000
            ) / 10000,
      }),
      {} as Partial<typeof selectedItem>
    );
    const newValues = {
      ...renormalizedObject,
      [field]: parseFloat(values[field]),
    };
    setValues(
      Object.keys(newValues).reduce(
        (acc, k) => ({
          ...acc,
          [k]: `${newValues[k as ModelKey] ?? 0}`,
        }),
        {}
      ) as Record<ModelKey, string>
    );
    updateItem(newValues);
  };

  const updateInStore = (k: ModelKey) => {
    if (normalize) {
      renormalizeAround(k);
    } else {
      const newValues: Record<string, number> = Object.keys(values).reduce(
        (acc, nextKey) => ({
          ...acc,
          [k]: parseFloat(values[nextKey as ModelKey] ?? 0),
        }),
        {}
      );
      newValues[k] = parseFloat(values[k as ModelKey] ?? 0);
      updateItem(newValues);
    }
  };
  return (
    <>
      {fields.map((k) => (
        <Label key={k}>
          <span>
            {fieldLabels[k as ModelKey]}
            {tags ? <InfoTag>{tags[k as ModelKey]}</InfoTag> : null}
          </span>

          <div>
            <Input
              $locked={valuesLocked[k as ModelKey]}
              style={{
                color:
                  parseFloat(values[k as ModelKey]) < 0
                    ? "var(--red)"
                    : "inherit",
              }}
              value={values[k as ModelKey]}
              onChange={(e) => {
                setValues({ ...values, [k]: e.target.value || "0" });
              }}
              onBlur={() => updateInStore(k as ModelKey)}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  updateInStore(k as ModelKey);
                  (e.target as HTMLInputElement).blur();
                }
              }}
            />
            {normalize &&
              (valuesLocked[k as ModelKey] ? (
                <IconContainer
                  onClick={() =>
                    setValuesLocked({ ...valuesLocked, [k]: false })
                  }
                >
                  <FaLock />
                </IconContainer>
              ) : (
                <IconContainer
                  onClick={() =>
                    setValuesLocked({ ...valuesLocked, [k]: true })
                  }
                >
                  <FaLockOpen />
                </IconContainer>
              ))}
          </div>
        </Label>
      ))}
      {normalize && (
        <>
          <hr />
          <Label key={"last"}>
            <span>Total</span>

            <div className="input short" style={{ textAlign: "right" }}>
              ={" "}
              {Math.round(
                10000 *
                  Object.values(values).reduce(
                    (acc, v) => acc + parseFloat(v),
                    0
                  )
              ) / 10000}
            </div>
          </Label>
        </>
      )}
      {Object.values(values).some(
        (v) => parseFloat(v) > 1 || parseFloat(v) < 0
      ) && (
        <Warning>
          Values greater than 1 or less than 0 should be used with care.
        </Warning>
      )}
    </>
  );
};
