from typing import Annotated, List
from fastmcp import FastMCP
from tkinter import simpledialog
from random import randint
import json
import os


mcp = FastMCP("Fate-GM-Kit")


def load_json_data(filename):
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(current_dir, filename)
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        return {}


PARAMETER_DATA = load_json_data("parameter_description.json")
CLASS_SKILLS_DATA = load_json_data("class_skill_description.json")
PERSONAL_SKILLS_DATA = load_json_data("personal_skill_description.json")


def get_skill_info(
        data,
        skill_name: str,
        skill_level: int
) -> str:
    target_skill = data.get(skill_name)

    if not target_skill:
        for _, value in data.items():
            if skill_name in value.get("label", ""):
                target_skill = value
                break

    if not target_skill:
        return None

    label = target_skill["label"]
    description = target_skill["description"]
    ranks = target_skill["ranks"]

    if skill_level < 0:
        return f"技能 {label}: {description}\n - 错误: 等级 EX (-1) 的技能无等级相关描述，请检查从者档案中是否已经给出了描述。"

    if skill_level > 4:
        return f"技能 {label}: {description}\n - 错误：给定的等级 {skill_level} 不是 0-4 之间的整数 (0 = A, 4 = E)。"

    rank_chars = ["A", "B", "C", "D", "E"]

    rank_desc = ""
    for i in range(skill_level, len(ranks)):
        rank_char = rank_chars[i]
        rank_info = ranks[i] if i < len(ranks) else ""
        rank_desc += f" - {rank_char} 级: {rank_info}\n"

    return f"技能 {label}: {description}\n{rank_desc.strip()}"


def imp_roll_dice(dice_expr: str) -> str:
    parts = dice_expr.strip().split(" ", 1)
    dice_part = parts[0]
    comment_part = f" {parts[1]}" if len(parts) > 1 else ""

    if 'd' not in dice_part:
        return "错误：无效的骰子表达式，缺少 'd'"

    num_dice_str, dice_type_str = dice_part.split('d', 1)
    num_dice = int(num_dice_str)
    dice_type = int(dice_type_str)

    if num_dice == 1:
        roll = randint(1, dice_type)
        return f"1d{dice_type}{comment_part}={roll}"
    else:
        rolls = [randint(1, dice_type) for _ in range(num_dice)]
        total = sum(rolls)
        rolls_str = ','.join(str(r) for r in rolls)
        return f"{num_dice}d{dice_type}{comment_part}=[{rolls_str}]={total}"


@mcp.tool(annotations={"readOnlyHint": True, "openWorldHint": False})
def roll_dice(
    dice_expr: Annotated[str, "骰子表达式, 例如 '2d6' 或 '1d20'；不支持复杂表达式；可以在表达式后面添加一个注释，用空格隔开，例如 '1d20 攻击检定'"]
) -> str:
    """
    执行一次掷骰，并返回结果。
    """
    return imp_roll_dice(dice_expr)


@mcp.tool(annotations={"readOnlyHint": True, "openWorldHint": False})
def roll_multi_dice(dice_exprs: Annotated[List[str], "多个骰子表达式的列表，每个表达式格式同 roll_dice 工具的输入"] ) -> str:
    """
    执行多次掷骰，并返回结果。
    """
    results = []
    for expr in dice_exprs:
        result = imp_roll_dice(expr)
        results.append(result)
    return "\n".join(results)


@mcp.tool(annotations={"readOnlyHint": True, "openWorldHint": False})
def get_parameter_info(
    parameter_id: Annotated[str, "参数的 ID, 包括 strength, endurance, agility, magicalEnergy, luck" ],
    parameter_level: Annotated[int, "参数等级, 0-4 之间的整数。0 表示 A 级, 4 表示 E 级"]
) -> str:
    """
    查询指定参数的描述。描述中包含参数的一般效果，以及给定具体等级时的效果。

    注意：
    - 如果从者档案中已经给出了某个参数的描述信息，请优先参考从者档案中的描述，不要使用此工具
    - 查询等级为 EX (-1) 的参数将不会得到正确结果，因为 EX 级代表“规格外”，没有标准的效果描述
    """

    if parameter_level < 0:
        return f"参数 '{parameter_id}': 错误: 等级 EX (-1) 的参数无等级相关描述，请检查从者档案中是否已经给出了描述。"

    if parameter_level > 4:
        return f"参数 '{parameter_id}': 错误：给定的等级 {parameter_level} 不是 0-4 之间的整数 (0 = A, 4 = E)。"

    parameter_info = PARAMETER_DATA.get(parameter_id)
    if not parameter_info:
        return f"未找到参数 ID 为 '{parameter_id}' 的参数描述。"

    label = parameter_info["label"]
    description = parameter_info["description"]
    level_description = parameter_info["ranks"][parameter_level]
    rank_char = ["A", "B", "C", "D", "E"][parameter_level]

    return f"{label}: {description}\n - {rank_char} 级: {level_description}"


@mcp.tool(annotations={"readOnlyHint": True, "openWorldHint": False})
def human_in_the_loop(question: str) -> str:
    """
    当遇到无法自行判断的状况时，向用户提问以获取准确的解答。
    与暂停推理等待用户通过 Prompt 输入答案不同，此工具不会中断 Agent 工作流，是更为合理的请求用户介入的方式。

    当需要确认某个你难以判定的规则时，例如“某两个技能/宝具的效果是否会互相影响”，你可以使用此工具向用户提问。

    注意:
    - 请不要将原本属于你的推理工作交给用户完成
    - 请不要为一些次要问题打扰用户，优先使用其他工具解决问题
    - 请求此工具时，请确保问题简洁明了，可以被简短地回答
    """
    return simpledialog.askstring("人在回路", question) or "用户没有提供解答。"


@mcp.tool(annotations={"readOnlyHint": True, "openWorldHint": False})
def class_skill_description(
    skill_id_or_name: Annotated[str, "职阶技能的 ID 或名称"],
    skill_level: Annotated[int, "技能等级, 0-4 之间的整数。0 表示 A 级, 4 表示 E 级"]
) -> str:
    """
    查询指定职阶技能的描述。描述中包含技能的一般效果，以及给定具体等级时的效果。

    除非另有说明，高等级的技能通常继承了低等级技能的效果。因此，当查询高等级的效果时，低等级的效果也会一并列出以供参考。

    注意:
    - 如果从者档案中已经给出了某个技能的描述信息，请优先参考从者档案中的描述，不要使用此工具
    - 尝试查询非标准的职阶技能 (uniqueClassSkills) 将不会得到正确结果
    - 查询等级为 EX (-1) 的技能也不会得到正确结果，因为 EX 级代表“规格外”，没有标准的效果描述
    """
    ret = get_skill_info(CLASS_SKILLS_DATA, skill_id_or_name, skill_level)
    if ret is not None:
        return ret

    ret = get_skill_info(PERSONAL_SKILLS_DATA, skill_id_or_name, skill_level)
    if ret is not None:
        return f"注意：查询到技能 '{skill_id_or_name}' 实际上是一个保有技能，而非职阶技能。\n\n" + ret

    return f"未找到名为 '{skill_id_or_name}' 的职阶技能。"



@mcp.tool(annotations={"readOnlyHint": True, "openWorldHint": False})
def personal_skill_description(
    skill_id_or_name: Annotated[str, "保有技能的 ID 或名称"],
    skill_level: Annotated[int, "技能等级, 0-4 之间的整数。0 表示 A 级, 4 表示 E 级"]
) -> str:
    """
    查询指定保有技能的描述。描述中包含技能的一般效果，以及给定具体等级时的效果。

    除非另有说明，高等级的技能通常继承了低等级技能的效果。因此，当查询高等级的效果时，低等级的效果也会一并列出以供参考。

    注意:
    - 如果从者档案中已经给出了某个技能的描述信息，请优先参考从者档案中的描述，不要使用此工具
    - 尝试查询非标准的保有技能 (uniquePersonalSkills) 将不会得到正确结果
    - 查询等级为 EX (-1) 的技能也不会得到正确结果，因为 EX 级代表“规格外”，没有标准的效果描述
    """
    ret = get_skill_info(PERSONAL_SKILLS_DATA, skill_id_or_name, skill_level)
    if ret is not None:
        return ret

    ret = get_skill_info(CLASS_SKILLS_DATA, skill_id_or_name, skill_level)
    if ret is not None:
        return f"注意：查询到技能 '{skill_id_or_name}' 实际上是一个职阶技能，而非保有技能。\n\n" + ret

    return f"未找到名为 '{skill_id_or_name}' 的保有技能。"


@mcp.tool(annotations={"readOnlyHint": True, "openWorldHint": False})
def list_standard_class_skills() -> str:
    """
    列出所有标准职阶技能的 ID 和名称，供查询时参考。
    """
    skill_list = []
    for skill_id, skill_info in CLASS_SKILLS_DATA.items():
        skill_list.append(f"- {skill_id}: {skill_info.get('label', '未知技能')}")

    return "\n".join(skill_list)


@mcp.tool(annotations={"readOnlyHint": True, "openWorldHint": False})
def list_standard_personal_skills() -> str:
    """
    列出所有标准保有技能的 ID 和名称，供查询时参考。
    """
    skill_list = []
    for skill_id, skill_info in PERSONAL_SKILLS_DATA.items():
        skill_list.append(f"- {skill_id}: {skill_info.get('label', '未知技能')}")

    return "\n".join(skill_list)


if __name__ == "__main__":
    mcp.run(transport="streamable-http")
