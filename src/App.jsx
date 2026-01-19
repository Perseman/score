
import { useEffect, useMemo, useState } from 'react'
import './App.css'

const uiText = {
  "heroTitle": "用户通过输入预设使用的材料数量，直观的得到可以获取哪一档奖励。",
  "heroLead": "每天都有1万，70万，180万，280万，400万，600万，800万，1200万，2000万这9档奖励。",
  "bonusTitle": "积分加成设置",
  'bonusDesc': '太学院的加成详情里查看',
  "tasksTitle": "任务",
  "tasksDesc": "输入次数或数量即可看到当日总积分与可领取档位。",
  "daySelectLabel": "当前选择",
  "currentScoreLabel": "当前积分",
  "totalLabel": "全周期总积分",
  "reachedPrefix": "已达",
  "notReachedPrefix": "未达",
  "nextPrefix": "下一档",
  "gapLabel": "还差",
  "unlocked": "已解锁最高档奖励",
  "perLabel": "单次",
  "bonusLabel": "加成",
  "itemLabel": "本项",
  "pointsUnit": "分"
}

const rewardTiers = [
  {
    "threshold": 10000,
    "label": "1万"
  },
  {
    "threshold": 700000,
    "label": "70万"
  },
  {
    "threshold": 1800000,
    "label": "180万"
  },
  {
    "threshold": 2800000,
    "label": "280万"
  },
  {
    "threshold": 4000000,
    "label": "400万"
  },
  {
    "threshold": 6000000,
    "label": "600万"
  },
  {
    "threshold": 8000000,
    "label": "800万"
  },
  {
    "threshold": 12000000,
    "label": "1200万"
  },
  {
    "threshold": 20000000,
    "label": "2000万"
  }
]

const bonusFields = [
  {
    "key": "hero",
    "label": "孙策积分加成",
    "description": ""
  },
  {
    "key": "beacon",
    "label": "烽火台任务",
    "description": ""
  },
  {
    "key": "golden",
    "label": "金色马车",
    "description": ""
  },
  {
    "key": "recruit",
    "label": "普通招募和高级招募",
    "description": ""
  },
  {
    "key": "speedup",
    "label": "加速建造、加速科技、加速训练",
    "description": ""
  },
  {
    "key": "train",
    "label": "训练士兵",
    "description": ""
  },
  {
    "key": "all",
    "label": "所有积分加成（非购买元宝）",
    "description": ""
  }
]

const bonusRules = {
  hero: () => true,
  beacon: (task) => task.type === 'beacon',
  golden: (task) => task.type === 'golden',
  recruit: (task) => task.type === 'recruit',
  speedup: (task) => task.type === 'speedup',
  train: (task) => task.type === 'train',
  all: (task) => task.type !== 'purchase',
}

const days = [
  {
    "id": "day1",
    "label": "第一天",
    "tasks": [
      {
        "id": "day1-task1",
        "name": "消耗1个专武碎片",
        "points": 10000
      },
      {
        "id": "day1-task2",
        "name": "消耗1个锻造石",
        "points": 10000
      },
      {
        "id": "day1-task3",
        "name": "完成1个烽火台任务",
        "points": 25000,
        "type": "beacon"
      },
      {
        "id": "day1-task4",
        "name": "采集1000单位食物",
        "points": 10
      },
      {
        "id": "day1-task5",
        "name": "采集1000单位木材",
        "points": 10
      },
      {
        "id": "day1-task6",
        "name": "采集500单位煤矿",
        "points": 10
      },
      {
        "id": "day1-task7",
        "name": "采集250单位铁",
        "points": 10
      },
      {
        "id": "day1-task8",
        "name": "购买10元宝礼包",
        "points": 100,
        "type": "purchase"
      }
    ]
  },
  {
    "id": "day2",
    "label": "第二天",
    "tasks": [
      {
        "id": "day2-task1",
        "name": "进行1次乾坤寻将",
        "points": 35000
      },
      {
        "id": "day2-task2",
        "name": "进行1次普通招募",
        "points": 800,
        "type": "recruit"
      },
      {
        "id": "day2-task3",
        "name": "进行1次高级招募",
        "points": 2500,
        "type": "recruit"
      },
      {
        "id": "day2-task4",
        "name": "消耗1个蓝色碎片",
        "points": 800
      },
      {
        "id": "day2-task5",
        "name": "消耗1个紫色碎片",
        "points": 2500
      },
      {
        "id": "day2-task6",
        "name": "消耗1个橙色碎片",
        "points": 600
      },
      {
        "id": "day2-task7",
        "name": "购买10元宝礼包",
        "points": 100,
        "type": "purchase"
      }
    ]
  },
  {
    "id": "day3",
    "label": "第三天",
    "tasks": [
       {
        "id": "day3-task11",
        "name": "获得1个转运符",
        "points": 4000
      },
      {
        "id": "day3-task1",
        "name": "消耗1个璞玉",
        "points": 5000
      },
      {
        "id": "day3-task2",
        "name": "消耗1个琢玉刀",
        "points": 25000
      },
      {
        "id": "day3-task3",
        "name": "消耗1分钟加速建造",
        "points": 150,
        "type": "speedup"
      },
      {
        "id": "day3-task4",
        "name": "回收1个普通藏品",
        "points": 2000
      },
      {
        "id": "day3-task5",
        "name": "回收1个精良藏品",
        "points": 5000
      },
      {
        "id": "day3-task6",
        "name": "回收1个稀有藏品",
        "points": 30000
      },
      {
        "id": "day3-task7",
        "name": "回收1个史诗藏品",
        "points": 80000
      },
      {
        "id": "day3-task8",
        "name": "回收1个传奇藏品",
        "points": 200000
      },
      {
        "id": "day3-task9",
        "name": "发出1次金色马车",
        "points": 200000,
        "type": "golden"
      },
      {
        "id": "day3-task10",
        "name": "购买10元宝礼包",
        "points": 100,
        "type": "purchase"
      }
    ]
  },
  {
    "id": "day4",
    "label": "第四天",
    "tasks": [
      {
        "id": "day4-task1",
        "name": "消耗1个锻造石",
        "points": 10000
      },
      {
        "id": "day4-task2",
        "name": "消耗1分钟加速科技",
        "points": 150,
        "type": "speedup"
      },
      {
        "id": "day4-task3",
        "name": "消耗1个六韬图",
        "points": 100
      },
      {
        "id": "day4-task4",
        "name": "完成1个烽火台任务",
        "points": 25000,
        "type": "beacon"
      },
      {
        "id": "day4-task5",
        "name": "购买10元宝礼包",
        "points": 100,
        "type": "purchase"
      }
    ]
  },
  {
    "id": "day5",
    "label": "第五天",
    "tasks": [
      {
        "id": "day5-task1",
        "name": "消耗1个紫檀木",
        "points": 85
      },
      {
        "id": "day5-task2",
        "name": "消耗1个精金",
        "points": 1700
      },
      {
        "id": "day5-task3",
        "name": "消耗1个青金石",
        "points": 5100
      },
      {
        "id": "day5-task4",
        "name": "击败1次流寇",
        "points": 1500
      },
      {
        "id": "day5-task5",
        "name": "击败1次山寨",
        "points": 5000
      },
      {
        "id": "day5-task6",
        "name": "训练1个1级士兵",
        "points": 14,
        "type": "train"
      },
      {
        "id": "day5-task7",
        "name": "训练1个2级士兵",
        "points": 20,
        "type": "train"
      },
      {
        "id": "day5-task8",
        "name": "训练1个3级士兵",
        "points": 28,
        "type": "train"
      },
      {
        "id": "day5-task9",
        "name": "训练1个4级士兵",
        "points": 38,
        "type": "train"
      },
      {
        "id": "day5-task10",
        "name": "训练1个5级士兵",
        "points": 51,
        "type": "train"
      },
      {
        "id": "day5-task11",
        "name": "训练1个6级士兵",
        "points": 72,
        "type": "train"
      },
      {
        "id": "day5-task12",
        "name": "训练1个7级士兵",
        "points": 99,
        "type": "train"
      },
      {
        "id": "day5-task13",
        "name": "训练1个8级士兵",
        "points": 134,
        "type": "train"
      },
      {
        "id": "day5-task14",
        "name": "训练1个9级士兵",
        "points": 155,
        "type": "train"
      },
      {
        "id": "day5-task15",
        "name": "训练1个10级士兵",
        "points": 182,
        "type": "train"
      },
      {
        "id": "day5-task16",
        "name": "购买10元宝礼包",
        "points": 100,
        "type": "purchase"
      }
    ]
  },
  {
    "id": "day6",
    "label": "第六天",
    "tasks": [
      {
        "id": "day6-task1",
        "name": "消耗1个坐骑碎片",
        "points": 100000
      },
      {
        "id": "day6-task2",
        "name": "消耗1个马具皮革",
        "points": 5000
      },
      {
        "id": "day6-task3",
        "name": "消耗1个鎏金铜扣",
        "points": 10000
      },
      {
        "id": "day6-task4",
        "name": "消耗1分钟加速建造",
        "points": 150,
        "type": "speedup"
      },
      {
        "id": "day6-task5",
        "name": "消耗1分钟加速训练",
        "points": 150,
        "type": "speedup"
      },
      {
        "id": "day6-task6",
        "name": "消耗1分钟加速科技",
        "points": 150,
        "type": "speedup"
      },
      {
        "id": "day6-task7",
        "name": "发出1次金色马车",
        "points": 200000,
        "type": "golden"
      },
      {
        "id": "day6-task8",
        "name": "购买10元宝礼包",
        "points": 100,
        "type": "purchase"
      }
    ]
  }
]

const defaultBonuses = bonusFields.reduce((acc, field) => {
  acc[field.key] = 0
  return acc
}, {})

const parseNumber = (value) => {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : 0
}

const sanitizePercent = (value) => Math.max(0, parseNumber(value))

const formatNumber = (value) =>
  new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 2 }).format(value)

const getTierInfo = (score) => {
  const reached = rewardTiers.reduce((result, tier) => {
    if (score >= tier.threshold) {
      return tier
    }
    return result
  }, null)
  const next = rewardTiers.find((tier) => score < tier.threshold) || null
  return { reached, next }
}

const getTaskBonusPercent = (task, bonuses) =>
  Object.keys(bonusRules).reduce((sum, key) => {
    const percent = bonuses[key] || 0
    if (percent > 0 && bonusRules[key](task)) {
      return sum + percent
    }
    return sum
  }, 0)

function App() {
  const [bonuses, setBonuses] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultBonuses
    }

    try {
      const stored = window.localStorage.getItem('score-bonuses')
      if (!stored) {
        return defaultBonuses
      }
      const parsed = JSON.parse(stored)
      return Object.keys(defaultBonuses).reduce((acc, key) => {
        acc[key] = sanitizePercent(parsed[key])
        return acc
      }, {})
    } catch (error) {
      return defaultBonuses
    }
  })
  const [quantities, setQuantities] = useState({})
  const [activeDayId, setActiveDayId] = useState(days[0]?.id ?? '')
  const [baseScore, setBaseScore] = useState('')
  const currentScore = Math.max(0, parseNumber(baseScore))

  useEffect(() => {
    window.localStorage.setItem('score-bonuses', JSON.stringify(bonuses))
  }, [bonuses])

  const daySummaries = useMemo(
    () =>
      days.map((day) => {
        const tasks = day.tasks.map((task) => {
          const quantity = parseNumber(quantities[task.id] ?? 0)
          const bonusPercent = getTaskBonusPercent(task, bonuses)
          const score = quantity * task.points * (1 + bonusPercent / 100)

          return {
            ...task,
            quantity,
            bonusPercent,
            score,
          }
        })

        const total = tasks.reduce((sum, task) => sum + task.score, 0)
        const totalWithBase = total + currentScore

        return {
          ...day,
          tasks,
          total,
          totalWithBase,
          tierInfo: getTierInfo(totalWithBase),
        }
      }),
    [bonuses, quantities, currentScore],
  )

  const totalScore = daySummaries.reduce((sum, day) => sum + day.total, 0) + currentScore
  const totalTier = getTierInfo(totalScore)
  const firstTierLabel = rewardTiers[0]?.label ?? '第一档'
  const activeDay =
    daySummaries.find((day) => day.id === activeDayId) ?? daySummaries[0]
  const activeDayIndex = daySummaries.findIndex((day) => day.id === activeDay?.id)

  const handleBonusChange = (key, value) => {
    setBonuses((prev) => ({
      ...prev,
      [key]: sanitizePercent(value),
    }))
  }

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-text">
          <h1>{uiText.heroTitle}</h1>
          <p className="lead">{uiText.heroLead}</p>
        </div>
      </header>

      <section className="section">
        <div className="section-title">
          <h2>{uiText.bonusTitle}</h2>
          {uiText.bonusDesc ? <p>{uiText.bonusDesc}</p> : null}
        </div>
        <div className="bonus-grid">
          {bonusFields.map((field, index) => (
            <div className="bonus-card" key={field.key} style={{ '--i': index }}>
              <div className="bonus-title">{field.label}</div>
              {field.description ? (
                <div className="bonus-desc">{field.description}</div>
              ) : null}
              <div className="bonus-input">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={bonuses[field.key]}
                  onChange={(event) =>
                    handleBonusChange(field.key, event.target.value)
                  }
                />
                <span className="suffix">%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <h2>{uiText.tasksTitle}</h2>
          {uiText.tasksDesc ? <p>{uiText.tasksDesc}</p> : null}
        </div>
        <div className="day-controls">
          <div className="day-selector">
            <span className="day-selector-label">{uiText.daySelectLabel}</span>
            <div className="day-selector-control">
              <select
                value={activeDay?.id ?? ''}
                onChange={(event) => setActiveDayId(event.target.value)}
              >
                {daySummaries.map((day) => (
                  <option key={day.id} value={day.id}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="score-input">
            <span className="day-selector-label">{uiText.currentScoreLabel}</span>
            <div className="score-input-control">
              <input
                type="number"
                min="0"
                step="1"
                inputMode="decimal"
                placeholder="0"
                value={baseScore}
                onChange={(event) => setBaseScore(event.target.value)}
              />
              <span className="score-input-suffix">{uiText.pointsUnit}</span>
            </div>
          </div>
        </div>
        <div className="days-grid">
          {activeDay ? (
            <article
              className="day-card"
              key={activeDay.id}
              style={{ '--i': Math.max(activeDayIndex, 0) }}
            >
              <header className="day-header">
                <div>
                  <div className="day-title">{activeDay.label}</div>
                  <div className="day-total">
                    {formatNumber(activeDay.totalWithBase)} {uiText.pointsUnit}
                  </div>
                </div>
                <div className="day-tier">
                  <span className="tier-badge">
                    {activeDay.tierInfo.reached
                      ? `${uiText.reachedPrefix} ${activeDay.tierInfo.reached.label}`
                      : `${uiText.notReachedPrefix} ${firstTierLabel}`}
                  </span>
                  <span className="tier-next">
                    {activeDay.tierInfo.next
                      ? `${uiText.nextPrefix}：${activeDay.tierInfo.next.label}，${uiText.gapLabel} ${formatNumber(
                          activeDay.tierInfo.next.threshold - activeDay.totalWithBase,
                        )} ${uiText.pointsUnit}`
                      : uiText.unlocked}
                  </span>
                </div>
              </header>

              <div className="tasks">
                {activeDay.tasks.map((task) => (
                  <div className="task-row" key={task.id}>
                    <div className="task-info">
                      <div className="task-name">{task.name}</div>
                      <div className="task-meta">
                        <span>
                          {uiText.perLabel} {formatNumber(task.points)}{' '}
                          {uiText.pointsUnit}
                        </span>
                        {task.bonusPercent > 0 ? (
                          <span className="task-bonus">
                            {uiText.bonusLabel} +
                            {formatNumber(task.bonusPercent)}%
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="task-input">
                      <div className="input-group">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          inputMode="decimal"
                          placeholder="0"
                          value={quantities[task.id] ?? ''}
                          onChange={(event) =>
                            handleQuantityChange(task.id, event.target.value)
                          }
                        />
                      </div>
                      <div className="task-score">
                        {uiText.itemLabel} {formatNumber(task.score)}{' '}
                        {uiText.pointsUnit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ) : null}
        </div>
      </section>
    </div>
  )
}

export default App
