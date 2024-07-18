import { fieldLabels } from "./fieldLabels";
export const infotags = {
  recipientHumans: (
    <>
      <p>
        The '{fieldLabels["recipientHumans"]}' value reflects how this worldview
        feels about value accrued to human beings. Higher values indicate
        greater concern for humans. A 0 value indicates indifference. A 1
        indicates full concern. Values less than 0 and greater than 1 can also
        be included.
      </p>
      <p>
        This value is used to modulate the worldview's assessment of the value a
        project provides to humans.
      </p>
    </>
  ),
  recipientBirdsAndMammals: (
    <>
      <p>
        The '{fieldLabels["recipientBirdsAndMammals"]}' value reflects how this
        worldview feels about value accrued to birds and mammals. Higher values
        indicate greater concern for them. A 0 value indicates indifference. A 1
        indicates full concern. Values less than 0 and greater than 1 can also
        be included.
      </p>
      <p>
        This value is used to modulate the worldview's assessment of the value a
        project provides to birds and mammals.
      </p>
    </>
  ),
  recipientFishAndReptiles: (
    <>
      <p>
        The '{fieldLabels["recipientFishAndReptiles"]}' value reflects how this
        worldview feels about value accrued to fish. Higher values indicate
        greater concern for fish. A 0 value indicates indifference. A 1
        indicates full concern. Values less than 0 and greater than 1 can also
        be included.
      </p>
      <p>
        This value is used to modulate the worldview's assessment of the value a
        project provides to fish.
      </p>
    </>
  ),
  recipientInvertebrates: (
    <>
      <p>
        The '{fieldLabels["recipientInvertebrates"]}' value reflects how this
        worldview feels about value accrued to crutaceans and insects. Higher
        values indicate greater concern for them. A 0 value indicates
        indifference. A 1 indicates full concern. Values less than 0 and greater
        than 1 can also be included.
      </p>
      <p>
        This value is used to modulate the worldview's assessment of the value a
        project provides to crustaceans and insects.
      </p>
    </>
  ),
  determinacyExisting: (
    <>
      <p>
        The '{fieldLabels["determinacyExisting"]}' value reflects how this
        worldview feels about value accrued to beings that currently exist.
        Higher values indicate greater concern for them. A 0 value indicates
        indifference. A 1 indicates full concern. Values less than 0 and greater
        than 1 can also be included.
      </p>
      <p>
        This value is used to modulate the worldview's assessment of the value a
        project provides to beings that currently exist.
      </p>
    </>
  ),
  determinacySoon: (
    <>
      <p>
        The '{fieldLabels["determinacySoon"]}' value reflects how this worldview
        feels about value accrued to beings that do not currently exist, but
        will in the coming years or decades. These beings will come to exist
        within our lifetimes and so may feel less hypothetical than creatures
        living far in the future. The beneficiaries for improvements in factory
        farming conditions likely fall into this category.
      </p>
      <p>
        Higher values indicate greater concern for them. A 0 value indicates
        indifference. A 1 indicates full concern. Values less than 0 and greater
        than 1 can also be included.
      </p>
      <p>
        This value is used to modulate the worldview's assessment of the value a
        project provides to beings that will soon exist.
      </p>
    </>
  ),
  determinacyEver: (
    <>
      <p>
        The '{fieldLabels["determinacyEver"]}' value reflects how this worldview
        feels about value accrued to beings that do not currently exist and will
        not exist in the coming years or decades. These beings, if they exist at
        all, will exist far in the future.
      </p>
      <p>
        Higher values indicate greater concern for them. A 0 value indicates
        indifference. A 1 indicates full concern. Values less than 0 and greater
        than 1 can also be included.
      </p>
      <p>
        This value is used to modulate the worldview's assessment of the value a
        project provides to beings that will someday exist, such as longtermist
        projects.
      </p>
    </>
  ),
  effectAddGood: (
    <>
      <p>
        The '{fieldLabels["effectAddGood"]}' value indicates what proportion of
        the value of the project comes from adding or creating good things, as
        opposed to removing or preventing bad things.
      </p>
    </>
  ),
  effectRemoveBad: (
    <>
      <p>
        The '{fieldLabels["effectRemoveBad"]}' value indicates what proportion
        of the value of the project comes from removing or preventing bad
        things, as opposed to adding or creating good things.
      </p>
    </>
  ),
  riskOrderDiscountPos: (
    <>
      <p>
        The '{fieldLabels["riskOrderDiscountNeg"]}' value reflects how much
        weight to give to the outcomes where the project has a positive impact.
        This value is used to modify the weight given to high value prospects.
        The value of an outcome X at probability P is equal to P &times; X
        &times; discount
        <sup>log(X)</sup>.
      </p>
    </>
  ),
  riskOrderDiscountNeg: (
    <>
      <p>
        The '{fieldLabels["riskOrderDiscountNeg"]}' value reflects how much
        weight to give to the outcomes where the project has a negative impact.
        This value is used to modify the weight given to low value prospects.
        The value of a negative outcome X at probability P is equal to P &times;
        X &times; discount<sup>log(X)</sup>.
      </p>
    </>
  ),
  valueEquity: (
    <>
      <p>
        The '{fieldLabels["valueEquity"]}' value reflects how this worldview
        feels about the value of equity and justice. A 1 indicates full concern.
        Values less than 0 and greater than 1 can also be included.
      </p>
      <p>
        This value is used to capture the worldview's interest in respect for
        fairness, desert, justice, and respect for rights. Values very close to
        0 put little regard in such experiences.
      </p>
    </>
  ),
  valueFlourishing: (
    <>
      <p>
        The '{fieldLabels["valueFlourishing"]}' value reflects how this
        worldview feels about the value of human flourishing, as separate from
        the value of living a pleasant or unpleasant life. A 1 indicates full
        concern. Values less than 0 and greater than 1 can also be included.
      </p>
      <p>
        This value is used to capture the worldview's interest in simply
        promoting wellbeing apart experiential pleasure and pain. Values very
        close to 0 put little regard in such expirences.
      </p>
    </>
  ),
  valuePleasantness: (
    <>
      <p>
        The '{fieldLabels["valuePleasantness"]}' value reflects how this
        worldview feels about the value of valenced experiences, as separate
        from the value of living a fulfilling or meaningful life. A 1 indicates
        full concern. Values less than 0 and greater than 1 can also be
        included.
      </p>
      <p>
        This value is used to capture the worldview's interest in simply
        promoting experiential pleasure and avoiding experiential pain. Values
        very close to 0 put little regard in such expirences.
      </p>
    </>
  ),
};
